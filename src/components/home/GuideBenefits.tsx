import { Icon, type IconName } from "@/components/ui/Icon";

const benefits: { icon: IconName; title: string; text: string }[] = [
  { icon: "phone", title: "Без компьютера", text: "Всё на вашем iPhone" },
  { icon: "list", title: "Шаг за шагом", text: "Понятно с первого раза" },
  { icon: "message", title: "Поможем, если нужно", text: "Поддержка рядом" },
];

export function GuideBenefits() {
  return (
    <div className="my-9 grid gap-5 border-y border-slate-200/80 py-6 sm:my-11 sm:grid-cols-3 sm:gap-3 sm:py-7">
      {benefits.map((benefit) => <div key={benefit.title} className="flex items-center gap-3"><Icon name={benefit.icon} size={22} className="shrink-0 text-slate-400" /><div><p className="text-[13px] font-semibold text-slate-700">{benefit.title}</p><p className="mt-1 text-xs text-slate-500">{benefit.text}</p></div></div>)}
    </div>
  );
}
