import { cn } from "@/lib/utils";

type ContainerWidth = "default" | "wide" | "text";

const widths: Record<ContainerWidth, string> = {
  default: "max-w-[72rem]",
  // The masthead runs wider than the content it sits above — which is also
  // what buys the Armenian nav row the width it needs.
  wide: "max-w-[88rem]",
  // One measure for every reading column on the site. 43rem of 18px text ran
  // to ~85 characters; --measure is 37rem, about 66.
  text: "max-w-(--measure)",
};

export function Container({
  children,
  className,
  width = "default",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  width?: ContainerWidth;
  as?: "div" | "section" | "header" | "footer" | "nav" | "article";
}) {
  // Gutter: 16/24px left the text almost against the edge on a tablet.
  // 20 / 24 / 32 gives the page a margin at every width.
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-6 md:px-8",
        widths[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
