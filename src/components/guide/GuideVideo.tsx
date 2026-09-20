"use client";

import { Icon } from "@/components/ui/Icon";
import { publicAssetPath } from "@/config/paths";
import type { GuideVideoSource } from "@/data/video";
import { useEffect, useState } from "react";
export type { GuideVideoSource } from "@/data/video";

const serviceNames = {
  telegram: "Telegram",
  youtube: "YouTube",
  rutube: "RuTube",
};

type SafariFullscreenVideo = HTMLVideoElement & {
  webkitDisplayingFullscreen?: boolean;
  webkitEnterFullscreen?: () => void;
};

function isTouchFirstDevice() {
  return navigator.maxTouchPoints > 0 && (
    window.matchMedia("(pointer: coarse)").matches
    || window.matchMedia("(hover: none)").matches
  );
}

function requestMobileVideoFullscreen(video: HTMLVideoElement) {
  if (!isTouchFirstDevice()) return;

  const safariVideo = video as SafariFullscreenVideo;
  if (safariVideo.webkitDisplayingFullscreen) return;

  if (typeof safariVideo.webkitEnterFullscreen === "function") {
    try {
      safariVideo.webkitEnterFullscreen();
      return;
    } catch {
      // Fall through to the standard Fullscreen API when WebKit cannot enter
      // its native player, for example before metadata is ready.
    }
  }

  if (document.fullscreenElement || typeof video.requestFullscreen !== "function") {
    return;
  }

  try {
    void video.requestFullscreen().catch(() => {
      // Browsers may reject fullscreen despite a user gesture. Playback must
      // continue inline in that case.
    });
  } catch {
    // Keep normal playback available when fullscreen is unsupported or denied.
  }
}

type GuideVideoProps = {
  source?: GuideVideoSource;
  sectionId?: string;
  titleId?: string;
  title?: string;
  emptyTitle?: string;
};

export function GuideVideo({
  source,
  sectionId = "video",
  titleId = "video-title",
  title = "Видеоинструкция",
  emptyTitle = "Видео скоро появится",
}: GuideVideoProps) {
  const originalSourceUrl = source?.type === "mp4" ? source.url : undefined;
  const sourceUrl = originalSourceUrl ? publicAssetPath(originalSourceUrl) : undefined;
  const isAutomaticLocalVideo = originalSourceUrl?.startsWith("/") === true;
  const [localVideoAvailable, setLocalVideoAvailable] = useState<boolean | null>(
    isAutomaticLocalVideo ? null : true,
  );

  useEffect(() => {
    if (!isAutomaticLocalVideo || !sourceUrl) return;

    let active = true;
    fetch(sourceUrl, { method: "HEAD", cache: "no-store" })
      .then((response) => {
        if (active) setLocalVideoAvailable(response.ok);
      })
      .catch(() => {
        if (active) setLocalVideoAvailable(false);
      });

    return () => {
      active = false;
    };
  }, [isAutomaticLocalVideo, sourceUrl]);

  const availableSource = isAutomaticLocalVideo && localVideoAvailable !== true
    ? undefined
    : source && sourceUrl && source.type === "mp4"
      ? { ...source, url: sourceUrl }
      : source;

  return (
    <section id={sectionId} aria-labelledby={titleId} className="scroll-mt-24">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id={titleId} className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        {!availableSource && <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-500">Скоро</span>}
      </div>
      {availableSource?.type === "mp4" ? (
        <video
          controls
          preload="metadata"
          aria-label={title}
          className="aspect-video w-full rounded-3xl bg-slate-100"
          onClick={(event) => {
            if (event.currentTarget.paused) {
              requestMobileVideoFullscreen(event.currentTarget);
            }
          }}
          onPlay={(event) => requestMobileVideoFullscreen(event.currentTarget)}
          onError={() => setLocalVideoAvailable(false)}
        >
          <source src={availableSource.url} type="video/mp4" />
          Ваш браузер не поддерживает видео. <a href={availableSource.url}>Скачать видеоинструкцию</a>
        </video>
      ) : availableSource ? (
        <a href={availableSource.url} target="_blank" rel="noopener noreferrer" aria-label={`Смотреть видеоинструкцию в ${serviceNames[availableSource.type]}, новая вкладка`} className="surface-card flex aspect-[16/9] w-full flex-col items-center justify-center gap-4 px-6 text-center outline-none transition-colors hover:border-blue-200 hover:bg-blue-50/30 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4">
          <span className="flex size-14 items-center justify-center rounded-full bg-blue-600 text-white"><Icon name="play" size={24} /></span>
          <span className="text-lg font-semibold text-slate-900">Смотреть в {serviceNames[availableSource.type]}</span>
          <span className="flex items-center gap-2 text-sm text-slate-500">Откроется в новой вкладке <Icon name="external" size={15} /></span>
        </a>
      ) : (
        <div className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-slate-200/80 bg-[linear-gradient(145deg,#f8fafc,#eef3f9)] px-6 text-center">
          <span className="mb-1 flex size-14 items-center justify-center rounded-2xl border border-white bg-white/80 text-slate-400 shadow-[0_3px_10px_rgba(15,23,42,0.03)]"><Icon name="play" size={25} /></span>
          <p className="text-lg font-semibold text-slate-700">{emptyTitle}</p>
          <p className="max-w-sm text-sm leading-6 text-slate-500">Пока воспользуйтесь пошаговой инструкцией.</p>
        </div>
      )}
    </section>
  );
}
