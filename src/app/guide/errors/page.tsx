import type { Metadata } from "next";
import Link from "next/link";
import { GuideFAQ } from "@/components/guide/GuideFAQ";
import { SupportButton } from "@/components/guide/SupportButton";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Частые ошибки при установке | Glory IOS",
  description: "Частые вопросы об установке ESign и приложений на iPhone. Помощь Glory IOS.",
};

export default function GuideErrorsPage() {
  return (
    <div className="page-shell pb-16 pt-8 sm:pb-24 sm:pt-12">
      <nav aria-label="Хлебные крошки" className="mb-9 flex flex-wrap items-center gap-2 text-sm text-slate-500 sm:mb-12">
        <Link href="/" className="inline-flex min-h-11 items-center rounded-md transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Главная</Link>
        <Icon name="chevron-right" size={14} />
        <Link href="/guide" className="inline-flex min-h-11 items-center rounded-md transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Инструкция</Link>
        <Icon name="chevron-right" size={14} />
        <span aria-current="page" className="text-slate-700">Частые ошибки</span>
      </nav>

      <header className="mb-8 sm:mb-10">
        <p className="eyebrow mb-3">Помощь с установкой</p>
        <h1 className="text-[34px] font-semibold leading-[1.12] tracking-[-0.045em] text-slate-900 sm:text-5xl">Частые ошибки</h1>
        <p className="mt-4 max-w-lg text-lg leading-7 text-slate-500">Выберите проблему, чтобы посмотреть решение.</p>
      </header>

      <GuideFAQ />

      <section aria-labelledby="support-title" className="surface-card mt-10 bg-slate-50/70 p-6 sm:mt-12 sm:p-8">
        <span className="mb-5 flex size-11 items-center justify-center rounded-xl bg-blue-100/60 text-blue-600"><Icon name="message" size={22} /></span>
        <h2 id="support-title" className="text-xl font-semibold tracking-tight text-slate-900">Не нашли ответ?</h2>
        <p className="mb-6 mt-2 max-w-lg text-base leading-7 text-slate-500">Напишите, на каком шаге возникла проблема. Поддержка поможет разобраться.</p>
        <SupportButton className="w-full sm:w-auto" />
      </section>

      <Link href="/guide" className="text-link mt-7 inline-flex min-h-11 items-center gap-2"><Icon name="arrow-left" size={17} />Вернуться к инструкции</Link>
    </div>
  );
}
