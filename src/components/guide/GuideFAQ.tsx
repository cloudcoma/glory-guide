"use client";

import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { faqItems, type FAQItem } from "@/data/faq";

function HighlightedText({ text }: { text: string }) {
  return text.split(/(\.mobileprovision|\.p12|\.ipa)/g).map((part, index) =>
    /^\.(mobileprovision|p12|ipa)$/.test(part) ? (
      <span key={index} className="inline-block rounded-md bg-blue-50 px-1.5 py-0.5 font-mono text-[0.9em] font-medium text-blue-700">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

export function GuideFAQ({ items = faqItems }: { items?: FAQItem[] }) {
  useEffect(() => {
    function openLinkedAnswer() {
      const id = window.location.hash.slice(1);
      if (!items.some((item) => item.id === id)) return;
      const answer = document.getElementById(id);
      if (answer instanceof HTMLDetailsElement) {
        answer.open = true;
        answer.scrollIntoView({ block: "start", behavior: "instant" });
      }
    }

    openLinkedAnswer();
    window.addEventListener("hashchange", openLinkedAnswer);
    return () => window.removeEventListener("hashchange", openLinkedAnswer);
  }, [items]);

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.id} id={item.id} className="group scroll-mt-24 rounded-2xl border border-slate-200/80 bg-white transition-colors open:border-blue-200 open:bg-blue-50/30">
          <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left text-base font-semibold leading-relaxed text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden sm:px-6">
            <span><HighlightedText text={item.title} /></span>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 group-open:rotate-180 group-open:bg-blue-100 group-open:text-blue-700 motion-reduce:transition-none">
              <Icon name="chevron-down" size={18} />
            </span>
          </summary>
          <div className="px-5 pb-6 sm:px-6">
            <p className="max-w-xl text-base leading-7 text-slate-600"><HighlightedText text={item.answer} /></p>
            {item.action && (
              <a
                href={item.action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="button-primary mt-5 min-h-14 w-full gap-2.5 px-5 sm:w-auto"
                aria-label={`${item.action.label}, открыть Telegram в новой вкладке`}
              >
                <Icon name="message" size={19} />
                {item.action.label}
                <Icon name="external" size={17} />
              </a>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
