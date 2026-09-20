"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, type KeyboardEvent } from "react";
import { GuideCompletion } from "@/components/guide/GuideCompletion";
import { GuideNavigation } from "@/components/guide/GuideNavigation";
import { GuideProgress } from "@/components/guide/GuideProgress";
import { GuideStep } from "@/components/guide/GuideStep";
import { SupportButton } from "@/components/guide/SupportButton";
import { Icon } from "@/components/ui/Icon";
import { guideSteps } from "@/data/guide";

type GuideLocation = { step: number; completed: boolean };

function readGuideLocation(search: string): GuideLocation {
  const params = new URLSearchParams(search);
  const rawStep = params.get("step");
  const parsedStep = rawStep === null ? 1 : Number(rawStep);
  const step = Number.isFinite(parsedStep) ? Math.min(guideSteps.length, Math.max(1, Math.trunc(parsedStep))) : 1;
  return { step, completed: step === guideSteps.length && params.get("completed") === "1" };
}

function guideUrl(location: GuideLocation) {
  const url = new URL(window.location.href);
  url.searchParams.set("step", String(location.step));
  if (location.completed) url.searchParams.set("completed", "1");
  else url.searchParams.delete("completed");
  return `${url.pathname}${url.search}${url.hash}`;
}

export function GuideFlow() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);
  const search = useSearchParams().toString();
  const previousSearch = useRef(search);
  const location = useMemo(() => readGuideLocation(search), [search]);
  const step = guideSteps[location.step - 1];

  useEffect(() => {
    const initialLocation = readGuideLocation(window.location.search);
    const params = new URLSearchParams(window.location.search);
    if ((params.has("step") && params.get("step") !== String(initialLocation.step)) || (params.has("completed") && !initialLocation.completed)) {
      window.history.replaceState(null, "", guideUrl(initialLocation));
    }
  }, []);

  useEffect(() => {
    if (previousSearch.current === search && !shouldFocus.current) return;
    previousSearch.current = search;
    shouldFocus.current = false;
    const frame = window.requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [search]);

  const navigate = useCallback((nextLocation: GuideLocation) => {
    shouldFocus.current = true;
    window.history.pushState(null, "", guideUrl(nextLocation));
  }, []);

  const previous = () => {
    if (location.step > 1) navigate({ step: location.step - 1, completed: false });
  };

  const next = () => {
    if (location.step < guideSteps.length) navigate({ step: location.step + 1, completed: false });
    else navigate({ step: guideSteps.length, completed: true });
  };

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (location.completed || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const target = event.target as HTMLElement;
    if (target.closest("a, button, input, textarea, select, summary, [contenteditable='true']")) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft" && location.step > 1) {
      event.preventDefault();
      previous();
    }
  }

  return (
    <div onKeyDown={handleKeyDown} role="region" aria-label="Пошаговая инструкция">
      <GuideProgress currentStep={location.step} totalSteps={guideSteps.length} completed={location.completed} />
      {location.completed ? (
        <GuideCompletion
          totalSteps={guideSteps.length}
          headingRef={headingRef}
        />
      ) : (
        <>
          <GuideStep key={step.id} step={step} titleRef={headingRef} />
          <GuideNavigation
            currentStep={location.step}
            totalSteps={guideSteps.length}
          />
          <p className="mt-4 text-center text-sm leading-6 text-slate-500">Нажмите «{location.step === guideSteps.length ? "Завершить" : "Далее"}», когда выполните этот шаг.</p>
        </>
      )}
      <div className="mt-8 flex flex-col items-center gap-3 border-t border-slate-200/70 pt-6 sm:flex-row sm:justify-between">
        <Link href="/guide/errors" className="flex min-h-12 items-center gap-2 text-base font-medium text-slate-600 hover:text-blue-600"><Icon name="help" size={19} />Частые ошибки</Link>
        <SupportButton />
      </div>
    </div>
  );
}
