import { Brand } from "./Brand";

export function SiteFooter() {
  return (
    <footer className="page-shell mt-16 pb-[max(28px,env(safe-area-inset-bottom))]">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-7 sm:flex-row">
        <Brand compact />
        <p className="text-center text-sm text-slate-500">Всё получится. Просто шаг за шагом.</p>
      </div>
    </footer>
  );
}
