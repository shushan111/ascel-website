import fs from "node:fs/promises";
import path from "node:path";

/**
 * Serves local preview files from .preview/ (git-ignored, outside public/) in
 * `next dev` only, for src/data/coursePreview.ts. In a production build it
 * answers 404 for everything, and the files are not part of the build: images
 * awaiting publication rights can never ship by accident.
 */
const ROOT = path.join(process.cwd(), ".preview");
const TYPES: Record<string, string> = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (process.env.NODE_ENV !== "development") return new Response(null, { status: 404 });
  const { path: parts } = await params;
  const file = path.join(ROOT, ...parts);
  const type = TYPES[path.extname(file).toLowerCase()];
  if (!type || !file.startsWith(ROOT + path.sep)) return new Response(null, { status: 404 });
  try {
    return new Response(await fs.readFile(file), { headers: { "Content-Type": type, "Cache-Control": "no-store" } });
  } catch {
    return new Response(null, { status: 404 });
  }
}
