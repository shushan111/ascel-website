/**
 * Image dimension probing, without a dependency.
 *
 * Name-based filtering alone does not catch every icon and divider on the
 * source pages, so downloaded files are also measured: anything small is a UI
 * element, not editorial photography.
 */

export interface ImageInfo {
  width: number;
  height: number;
  format: "png" | "jpeg" | "gif" | "webp" | "unknown";
}

export function probeImage(buf: Buffer): ImageInfo {
  // PNG: IHDR is always the first chunk.
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), format: "png" };
  }

  // GIF87a / GIF89a
  if (buf.length > 10 && buf.toString("ascii", 0, 3) === "GIF") {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8), format: "gif" };
  }

  // WebP (VP8 / VP8L / VP8X)
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff, format: "webp" };
    }
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1, format: "webp" };
    }
    if (chunk === "VP8X") {
      const w = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
      const h = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
      return { width: w, height: h, format: "webp" };
    }
  }

  // JPEG: walk the segment chain to the SOFn frame header.
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset < buf.length - 9) {
      if (buf[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buf[offset + 1];
      const length = buf.readUInt16BE(offset + 2);
      // SOF0-SOF3, SOF5-SOF7, SOF9-SOF11, SOF13-SOF15 carry the dimensions.
      const isSof =
        marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isSof) {
        return {
          height: buf.readUInt16BE(offset + 5),
          width: buf.readUInt16BE(offset + 7),
          format: "jpeg",
        };
      }
      offset += 2 + length;
    }
    return { width: 0, height: 0, format: "jpeg" };
  }

  return { width: 0, height: 0, format: "unknown" };
}

/** Below this on either edge an image is chrome — an icon, rule or badge. */
export const MIN_EDGE = 200;
export const MIN_BYTES = 8 * 1024;

export function fileNameFromUrl(url: string, index: number): string {
  const tail = url.split("/").pop() ?? "image";
  const safe = tail
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const named = safe && safe !== "." ? safe : "image.jpg";
  return `${String(index).padStart(2, "0")}-${named}`;
}
