import { cn } from "@/lib/utils";
import { AlertIcon, CheckIcon, InfoIcon } from "@/components/ui/icons";

type NoticeTone = "ok" | "danger" | "info" | "warn";

const tones: Record<NoticeTone, string> = {
  ok: "border-ok/25 bg-ok-soft text-ok",
  danger: "border-danger/25 bg-danger-soft text-danger",
  warn: "border-warn/25 bg-warn-soft text-warn",
  info: "border-line bg-sand text-ink",
};

/**
 * Form and page feedback: a tinted panel with an icon, a title and an
 * optional body. `role` defaults to status (polite); pass "alert" for errors
 * that must interrupt.
 */
export function Notice({
  tone = "info",
  title,
  children,
  role = "status",
  className,
}: {
  tone?: NoticeTone;
  title: string;
  children?: React.ReactNode;
  role?: "status" | "alert";
  className?: string;
}) {
  const Icon = tone === "ok" ? CheckIcon : tone === "info" ? InfoIcon : AlertIcon;
  return (
    <div
      role={role}
      className={cn("flex animate-fade-in gap-3 rounded-sm border px-4 py-3.5", tones[tone], className)}
    >
      <Icon className="mt-0.5 h-[1.125rem] w-[1.125rem]" />
      <div className="min-w-0">
        <p className="text-[0.96875rem] font-medium leading-6">{title}</p>
        {children ? <div className="t-small mt-1 text-body">{children}</div> : null}
      </div>
    </div>
  );
}
