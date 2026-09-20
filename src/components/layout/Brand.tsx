import Link from "next/link";
import Image from "next/image";
import { publicAssetPath } from "@/config/paths";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" aria-label="Glory IOS — главная" className="inline-flex min-h-11 shrink-0 items-center gap-2.5">
      <Image src={publicAssetPath("/images/brand/glory-symbol.png")} alt="" width={44} height={44} unoptimized className="h-11 w-11 object-contain" />
      <span className={`${compact ? "text-base" : "text-[17px] sm:text-[19px]"} font-bold tracking-[-.045em]`}>
        Glory <span className="font-bold text-slate-500">IOS</span>
      </span>
    </Link>
  );
}
