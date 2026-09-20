import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { AppIconsPreview } from "@/components/home/AppIconsPreview";

export function GuideHero() {
  return (
    <section className="grid items-center gap-3 pt-8 sm:gap-6 sm:pt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-3 lg:pt-14" aria-labelledby="home-title">
      <div className="text-left sm:mx-auto sm:w-full sm:max-w-[580px]">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-100/80 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" />Ваш iPhone. Новые возможности.</div>
        <h1 id="home-title" className="mt-5 text-[clamp(36px,10.8vw,47px)] leading-[1.08] font-semibold tracking-[-.055em] sm:text-[53px]">Установка<br />приложений<br /><span className="text-blue-600">на iPhone</span></h1>
        <p className="mt-5 text-[17px] leading-[1.65] text-slate-500 sm:max-w-[410px] lg:max-w-[340px]">Следуйте инструкции шаг за шагом. Весь процесс займёт несколько минут.</p>
        <Link href="/guide?step=1" className="button-primary mt-6 min-h-20 w-full gap-4 rounded-[20px] px-5 py-6 text-[19px] font-semibold shadow-[0_8px_24px_#1769ed29] sm:min-h-[88px] sm:text-xl">Начать установку <Icon name="arrow-right" size={24} /></Link>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500"><Icon name="clock" size={15} /><span>5–10 минут · Без компьютера</span></div>
      </div>
      <AppIconsPreview />
    </section>
  );
}
