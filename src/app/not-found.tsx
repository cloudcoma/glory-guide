import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export default function NotFound() {
  return <div className="page-shell py-20 text-center"><p className="eyebrow">404</p><h1 className="mt-4 text-3xl font-semibold tracking-tight">Эта страница не найдена</h1><p className="mt-4 text-slate-500">Начните с главной или вернитесь к инструкции.</p><Link href="/guide" className="button-primary mt-7">Открыть инструкцию <Icon name="arrow-right" /></Link></div>;
}
