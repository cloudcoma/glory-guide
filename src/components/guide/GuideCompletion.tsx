"use client";

import Link from "next/link";
import type { Ref } from "react";
import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";
import { guideCompletion } from "@/data/guide-completion";

type GuideCompletionProps = {
  totalSteps: number;
  headingRef?: Ref<HTMLHeadingElement>;
};

export function GuideCompletion({ totalSteps, headingRef }: GuideCompletionProps) {
  return (
    <section className="surface-card animate-enter p-5 text-center sm:p-10" aria-labelledby="guide-completed">
      <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-[22px] bg-blue-50 text-blue-600" aria-hidden="true">
        <Icon name="check" size={30} />
      </div>
      <p className="eyebrow mb-3">ВСЕ {totalSteps} ШАГОВ</p>
      <h2 id="guide-completed" ref={headingRef} tabIndex={-1} className="mb-4 scroll-mt-24 text-[27px] leading-tight font-semibold tracking-tight text-slate-900 outline-none sm:text-[32px]">
        {guideCompletion.title}
      </h2>
      <p className="mb-2 text-lg font-semibold text-slate-800">{guideCompletion.thanks}</p>
      <p className="mx-auto max-w-lg text-[17px] leading-relaxed text-slate-600 sm:text-lg">{guideCompletion.description}</p>
      <a href={siteConfig.reviewsUrl} target="_blank" rel="noopener noreferrer" className="button-primary mt-7 min-h-16 w-full text-lg sm:max-w-sm">
        {guideCompletion.reviewLabel}
        <Icon name="arrow-right" />
        <span className="sr-only"> (откроется в новой вкладке)</span>
      </a>
      <Link href="/guide/errors#app-install" className="button-secondary mt-3 w-full sm:max-w-sm">
        {guideCompletion.helpLabel}
        <Icon name="help" />
      </Link>
      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1">
        <Link href={`/guide?step=${totalSteps}`} prefetch={false} className="text-link min-h-12">Вернуться к шагу {totalSteps}</Link>
        <Link href="/guide?step=1" prefetch={false} className="flex min-h-12 items-center text-base font-medium text-slate-500 hover:text-slate-800">{guideCompletion.restartLabel}</Link>
      </div>
    </section>
  );
}
