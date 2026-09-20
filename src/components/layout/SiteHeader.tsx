"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "./Brand";
import { SupportButton } from "@/components/guide/SupportButton";
import { Icon } from "@/components/ui/Icon";

export function SiteHeader() {
  const pathname = usePathname().replace(/\/+$/, "") || "/";
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="page-shell flex h-[76px] items-center justify-between gap-3">
        <Brand />
        <nav aria-label="Основная навигация" className="flex items-center gap-1 sm:gap-5">
          <Link href="/guide" aria-current={pathname === "/guide" ? "page" : undefined} className={`hidden min-h-11 items-center text-sm font-medium sm:inline-flex ${pathname === "/guide" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}>Инструкция</Link>
          <Link href="/guide/errors" aria-current={pathname === "/guide/errors" ? "page" : undefined} className={`flex min-h-11 items-center gap-1.5 px-1.5 text-sm font-medium sm:px-2 ${pathname === "/guide/errors" ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}><Icon name="help" size={17} className="hidden sm:block" /><span>FAQ</span></Link>
          <SupportButton label="Поддержка" variant="compact" />
        </nav>
      </div>
    </header>
  );
}
