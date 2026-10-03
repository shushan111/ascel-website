import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableBlock } from "@/types";
import { cn } from "@/lib/utils";

type TableValue = {
  hasHeader?: boolean;
  rows?: Array<{ cells?: string[] }>;
};

/**
 * Renders a programme table. The course schedules are wide (time / topic /
 * lecturer), so on a phone the table scrolls horizontally inside its own box
 * rather than forcing the page to.
 */
function ProgrammeTable({ value }: { value: TableValue }) {
  const rows = (value.rows ?? []).map((row) => row.cells ?? []);
  if (!rows.length) return null;

  const [first, ...rest] = rows;
  const body = value.hasHeader ? rest : rows;
  const columns = Math.max(...rows.map((r) => r.length));

  return (
    <div className="not-prose my-8 overflow-x-auto rounded-md border border-line">
      <table className="w-full min-w-[34rem] border-collapse text-left text-[0.92rem]">
        {value.hasHeader ? (
          <thead>
            <tr className="border-b border-line bg-canvas">
              {Array.from({ length: columns }, (_, i) => (
                <th
                  key={i}
                  scope="col"
                  className="t-meta-sm px-4 py-3 align-top font-medium text-muted"
                >
                  {first[i] ?? ""}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {body.map((cells, r) => {
            // A row whose only content sits in the second cell is a module or
            // session divider, not a scheduled item.
            const isDivider = !cells[0] && Boolean(cells[1]);
            return (
              <tr
                key={r}
                className={cn(
                  "border-b border-line last:border-b-0",
                  isDivider && "bg-canvas",
                )}
              >
                {Array.from({ length: columns }, (_, c) => (
                  <td
                    key={c}
                    className={cn(
                      "px-4 py-3 align-top leading-6",
                      c === 0 && "whitespace-nowrap tabular-nums text-muted",
                      isDivider && "font-medium text-ink",
                    )}
                  >
                    {cells[c] ?? ""}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const components: PortableTextComponents = {
  types: {
    contentTable: ({ value }) => <ProgrammeTable value={value as TableValue} />,
  },
};

export function RichText({
  value,
  className,
}: {
  value?: PortableBlock[];
  className?: string;
}) {
  if (!value?.length) return null;
  return (
    <div className={cn("prose-ascel", className)}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PortableText value={value as any} components={components} />
    </div>
  );
}
