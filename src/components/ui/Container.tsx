import { cn } from "@/lib/utils";

type ContainerWidth = "default" | "wide" | "text";

const widths: Record<ContainerWidth, string> = {
  default: "max-w-[72rem]",
  // The masthead runs wider than the content it sits above — which is also
  // what buys the Armenian nav row the width it needs.
  wide: "max-w-[88rem]",
  text: "max-w-[43rem]",
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
  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6", widths[width], className)}>
      {children}
    </Tag>
  );
}
