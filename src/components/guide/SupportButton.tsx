import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";

type SupportButtonProps = {
  className?: string;
  label?: string;
  variant?: "default" | "compact" | "tile";
};

export function SupportButton({ className = "", label = "Не получилось? Написать в поддержку", variant = "default" }: SupportButtonProps) {
  const linkClasses = variant === "compact"
    ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-100 px-2.5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200/70 sm:px-3"
    : variant === "tile"
      ? "flex min-h-[90px] w-full items-center gap-3 rounded-[20px] border border-slate-200/80 bg-white px-4 py-4 text-left transition-colors hover:border-blue-200 hover:bg-blue-50/40 sm:min-h-[106px] sm:flex-col sm:items-start sm:gap-3 sm:px-5"
      : "button-secondary h-auto min-h-14 gap-2 px-5 py-4 text-center leading-snug";

  return (
    <a
      href={siteConfig.supportUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${linkClasses} ${className}`}
      aria-label={`${label}, открыть Telegram в новой вкладке`}
    >
      <span className={variant === "tile" ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-blue-50 text-blue-600" : variant === "compact" ? "hidden shrink-0 sm:inline-flex" : "shrink-0"}>
        <Icon name="message" size={variant === "compact" ? 16 : 19} />
      </span>
      <span className={variant === "tile" ? "flex w-full items-center justify-between text-[15px] font-medium" : ""}>
        {label}
        {variant === "tile" && <Icon name="chevron-right" size={16} className="text-slate-400" />}
      </span>
    </a>
  );
}
