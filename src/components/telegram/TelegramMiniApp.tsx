"use client";

import Script from "next/script";

type TelegramWebApp = {
  initData: string;
  ready: () => void;
  expand: () => void;
};

function initializeMiniApp() {
  const telegramWindow = window as Window & {
    Telegram?: { WebApp?: TelegramWebApp };
  };
  const app = telegramWindow.Telegram?.WebApp;
  if (!app?.initData) return;

  app.ready();
  app.expand();
}

export function TelegramMiniApp() {
  return (
    <Script
      src="https://telegram.org/js/telegram-web-app.js"
      strategy="afterInteractive"
      onReady={initializeMiniApp}
    />
  );
}
