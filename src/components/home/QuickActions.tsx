import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SupportButton } from "@/components/guide/SupportButton";

const actionClass = "group flex min-h-[90px] items-center gap-3 rounded-[20px] border border-slate-200/80 bg-white px-4 py-4 transition-colors hover:border-blue-200 hover:bg-blue-50/40 sm:min-h-[106px] sm:flex-col sm:items-start sm:gap-3 sm:px-5";

function ActionIcon({ name }: { name: IconName }) {
  return <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-blue-50 text-blue-600"><Icon name={name} size={19} /></span>;
}

export function QuickActions() {
  return (
    <nav aria-label="Быстрая помощь" className="mt-8 grid gap-2.5 sm:mt-7 sm:grid-cols-3 sm:gap-3">
      <Link href="#video" className={actionClass}><ActionIcon name="play" /><span className="flex w-full items-center justify-between text-[15px] font-medium">Смотреть видео <Icon name="chevron-right" size={16} className="text-slate-400" /></span></Link>
      <Link href="/guide/errors" className={actionClass}><ActionIcon name="help" /><span className="flex w-full items-center justify-between text-[15px] font-medium">Частые ошибки <Icon name="chevron-right" size={16} className="text-slate-400" /></span></Link>
      <SupportButton label="Поддержка" variant="tile" />
    </nav>
  );
}
