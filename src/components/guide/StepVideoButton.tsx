"use client";

import { useState } from "react";
import { GuideVideo } from "@/components/guide/GuideVideo";
import { Icon } from "@/components/ui/Icon";
import { getGuideStepVideoSource } from "@/data/video";

type StepVideoButtonProps = {
  stepId: number;
};

export function StepVideoButton({ stepId }: StepVideoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const stepSource = getGuideStepVideoSource(stepId);
  const detailsId = `step-${stepId}-video-details`;
  const summaryId = `step-${stepId}-video-trigger`;
  const sectionId = `step-${stepId}-video`;
  const titleId = `step-${stepId}-video-title`;

  return (
    <details
      id={detailsId}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
      className="group mt-5 rounded-2xl border border-transparent open:border-blue-200 open:bg-blue-50/40"
    >
      <summary
        id={summaryId}
        aria-controls={sectionId}
        className="flex min-h-14 w-full cursor-pointer list-none items-center justify-center gap-2.5 rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3.5 text-center text-base font-semibold text-blue-700 shadow-[0_8px_24px_-18px_rgba(37,99,235,0.8)] outline-none transition-colors hover:border-blue-300 hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <Icon name="play" size={16} />
        </span>
        <span>Посмотреть видео</span>
        <Icon
          name="chevron-down"
          size={18}
          className="shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
        />
      </summary>
      <div id={sectionId} className="px-3 pt-5 pb-3 sm:px-5 sm:pb-5">
        {isOpen && (
          <GuideVideo
            source={stepSource}
            sectionId={`${sectionId}-content`}
            titleId={titleId}
            title={`Видео к шагу ${stepId}`}
            emptyTitle={`Видео шага ${stepId} скоро появится`}
          />
        )}
      </div>
    </details>
  );
}
