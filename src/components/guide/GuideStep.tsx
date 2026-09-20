"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type Ref } from "react";
import { StepVideoButton } from "@/components/guide/StepVideoButton";
import { Icon } from "@/components/ui/Icon";
import type { GuideParagraph, GuideStepData } from "@/data/guide";
import { publicAssetPath } from "@/config/paths";

function GuideText({ content }: { content: GuideParagraph }) {
  if (typeof content === "string") return content;

  return (
    <>
      {content.map((part, index) => {
        if (part.kind === "file") {
          return <code key={index} className="rounded-md bg-blue-50 px-1.5 py-0.5 font-mono text-[0.9em] font-semibold text-blue-700 [overflow-wrap:anywhere]">{part.text}</code>;
        }
        if (part.kind === "strong") return <strong key={index} className="font-medium text-slate-800">{part.text}</strong>;
        return <span key={index}>{part.text}</span>;
      })}
    </>
  );
}

function InstructionParagraph({ content }: { content: GuideParagraph }) {
  return <p><GuideText content={content} /></p>;
}

function StepImage({ step }: { step: GuideStepData }) {
  const [imageMissing, setImageMissing] = useState(false);
  const [imageRatio, setImageRatio] = useState<string>();

  return (
    <figure className="mt-7 overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-50">
      <div
        className="relative flex min-h-60 items-center justify-center bg-[radial-gradient(ellipse_at_top,#f0f7ff,#f5f7fa_70%)] p-6 sm:min-h-72 sm:p-8"
        style={imageRatio && !imageMissing ? { aspectRatio: imageRatio, minHeight: 0, maxHeight: 640 } : undefined}
      >
        {!imageMissing && (
          <Image
            src={publicAssetPath(step.image)}
            alt={step.imageAlt}
            fill
            sizes="(max-width: 640px) calc(100vw - 88px), 680px"
            className="z-10 object-contain"
            unoptimized
            loading="eager"
            onLoad={(event) => {
              const image = event.currentTarget;
              if (image.naturalWidth && image.naturalHeight) {
                setImageRatio(`${image.naturalWidth} / ${image.naturalHeight}`);
              }
            }}
            onError={() => setImageMissing(true)}
          />
        )}
        <div className="flex flex-col items-center text-center" aria-hidden={!imageMissing}>
          <div className="mb-4 flex h-20 w-16 items-center justify-center rounded-2xl border-[3px] border-white bg-white/70 text-blue-600 shadow-[0_8px_30px_-12px_rgba(71,101,141,0.3)]">
            <Icon name={step.icon} size={29} />
          </div>
          <p className="mb-1 text-base font-medium text-slate-600">Изображение этого шага</p>
          <p className="max-w-sm text-sm text-slate-500">{step.imageLabel}</p>
        </div>
      </div>
      <figcaption className="border-t border-slate-200/70 bg-white/70 px-5 py-3 text-center text-sm leading-6 text-slate-500">
        {step.imageLabel}
      </figcaption>
    </figure>
  );
}

type GuideStepProps = {
  step: GuideStepData;
  titleRef?: Ref<HTMLHeadingElement>;
};

export function GuideStep({ step, titleRef }: GuideStepProps) {
  return (
    <article className="surface-card animate-enter p-5 sm:p-8" aria-labelledby={`step-title-${step.id}`}>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-xl bg-blue-50 text-sm font-semibold text-blue-600" aria-hidden="true">{String(step.id).padStart(2, "0")}</span>
        <p className="eyebrow">ШАГ {step.id}</p>
      </div>
      <h2
        id={`step-title-${step.id}`}
        ref={titleRef}
        tabIndex={-1}
        className="mb-4 scroll-mt-24 text-[27px] leading-tight font-semibold tracking-tight text-slate-900 outline-none sm:text-[32px]"
      >
        {step.title}
      </h2>
      <div className="space-y-3 text-[17px] leading-relaxed text-slate-600 sm:text-lg">
        {step.description.map((paragraph, index) => <InstructionParagraph key={index} content={paragraph} />)}
      </div>
      {step.warning && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-base leading-relaxed text-blue-800">
          <Icon name="help" className="mt-0.5 shrink-0" />
          <p>{step.warning}</p>
        </div>
      )}
      {step.action && (
        <div className="mt-6">
          {step.action.description && (
            <div className="mb-3 text-base leading-relaxed text-slate-600 sm:text-lg">
              <InstructionParagraph content={step.action.description} />
            </div>
          )}
          {step.action.href ? (
            <a href={step.action.href} target="_blank" rel="noopener noreferrer" className="button-primary min-h-16 w-full text-lg sm:w-auto sm:min-w-64">
              <Icon name="message" size={22} />
              {step.action.label}
              <Icon name="external" size={18} />
            </a>
          ) : (
            <>
              <button type="button" disabled className="button-primary min-h-16 w-full text-lg sm:w-auto sm:min-w-64" aria-describedby={`step-action-hint-${step.id}`}>
                <Icon name="message" size={22} />
                {step.action.label}
              </button>
              <p id={`step-action-hint-${step.id}`} className="mt-2 text-sm text-slate-500">Ссылка на бота скоро появится.</p>
            </>
          )}
        </div>
      )}
      <StepImage step={step} />
      {step.showVideo !== false && <StepVideoButton stepId={step.id} />}
      <details className="group mt-5 rounded-2xl border border-transparent open:border-slate-200 open:bg-slate-50">
        <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 rounded-xl px-3 text-base font-medium text-slate-600 transition-colors hover:text-blue-600 [&::-webkit-details-marker]:hidden">
          <Icon name="help" size={18} />
          Не получается?
          <Icon name="chevron-down" size={17} className="ml-auto transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
        </summary>
        <div className="px-4 pt-1 pb-4 text-base leading-relaxed text-slate-600">
          <InstructionParagraph content={step.helpText} />
          <Link href={step.helpHref} className="text-link mt-3 inline-flex min-h-11 items-center gap-1.5">
            Посмотреть частые ошибки
            <Icon name="arrow-right" size={17} />
          </Link>
          {step.extraHelpLinks?.map((link) => (
            <Link key={link.href} href={link.href} className="text-link mt-1 flex min-h-11 items-center gap-1.5">
              <span><GuideText content={link.label} /></span>
              <Icon name="arrow-right" size={17} className="shrink-0" />
            </Link>
          ))}
        </div>
      </details>
    </article>
  );
}
