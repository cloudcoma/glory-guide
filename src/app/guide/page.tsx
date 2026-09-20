import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { GuideFlow } from "@/components/guide/GuideFlow";
import { Icon } from "@/components/ui/Icon";
import { guideDuration, guideSteps } from "@/data/guide";

export const metadata: Metadata = {
  title: "Установка приложений на iPhone | Glory IOS",
  description: `${guideSteps.length} понятных шагов для установки приложений на iPhone через ESign. Инструкция Glory IOS.`,
};

export default function GuidePage() {
  return (
    <div className="page-shell pt-4 pb-12 sm:pt-9 sm:pb-16">
      <nav aria-label="Хлебные крошки" className="mb-4 flex items-center gap-2 text-base text-slate-500 sm:mb-7">
        <Link href="/" className="inline-flex min-h-11 items-center hover:text-blue-600">Главная</Link>
        <Icon name="chevron-right" size={16} />
        <span aria-current="page" className="text-slate-700">Инструкция</span>
      </nav>
      <div className="mb-6 sm:mb-8">
        <p className="eyebrow mb-3 hidden sm:block">ПОШАГОВАЯ ИНСТРУКЦИЯ</p>
        <h1 className="max-w-xl text-[32px] leading-[1.15] font-semibold tracking-tight text-slate-900 sm:text-[40px]">Установка приложений</h1>
        <p className="mt-4 flex items-center gap-2 text-base text-slate-500"><Icon name="clock" size={18} />Примерное время: {guideDuration}</p>
      </div>
      <Suspense fallback={<p role="status" className="surface-card p-8 text-slate-500">Загружаем инструкцию…</p>}>
        <GuideFlow />
      </Suspense>
    </div>
  );
}
