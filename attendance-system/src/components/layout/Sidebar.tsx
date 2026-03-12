"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ThemeMode } from "./AppShell";
import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";

const nav = [
  { href: "/", key: "nav.dashboard" as const },
  { href: "/soldiers", key: "nav.soldiers" as const },
  { href: "/proofs", key: "nav.proofs" as const },
  { href: "/reports", key: "nav.reports" as const },
];

interface SidebarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Sidebar({ theme, onToggleTheme }: SidebarProps) {
  const pathname = usePathname();
  const isDark = theme === "dark";
  const { locale, setLocale, t } = useI18n();

  return (
    <aside className="hidden min-h-screen w-52 shrink-0 border-r border-[#011933] bg-[#02254E] md:flex md:flex-col md:justify-between">
      <div>
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/20">
              <Image
                src="/logo2.png"
                alt="Logo"
                width={96}
                height={96}
                className="h-full w-full object-contain p-1"
                priority
              />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide text-white">
                {t("app.title")}
              </div>
              <div className="text-xs text-slate-200">Demo frontend</div>
            </div>
          </div>
        </div>
        <nav className="px-2 pb-4">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mx-4 flex items-center justify-between rounded-md px-1 py-2 text-sm transition-colors ${
                  active
                    ? "bg-[#0C4DA2] text-white ring-1 ring-[#F4C648]/70"
                    : "text-slate-200 hover:bg-[#0C4DA2]/50 hover:text-white"
                }`}
              >
                <span>{t(item.key)}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-[#011933] px-4 py-4">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-200">
          <span>{t("theme.label")}</span>
          <select
            value={locale}
            onChange={(e) => setLocale(e.target.value as any)}
            className="rounded-md border border-white/30 bg-white/10 px-2 py-1 text-xs text-white outline-none"
          >
            <option value="am">አማርኛ</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2 text-xs text-slate-200">
          <span>Theme</span>
          <button
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-[#F4C648] bg-transparent px-3 py-1 text-xs text-white"
          >
            <span className="h-4 w-8 rounded-full border border-[#F4C648] bg-transparent">
              <span
                className={`block h-3 w-3 translate-y-[2px] rounded-full bg-[#F4C648] transition-transform ${
                  isDark ? "translate-x-[18px]" : "translate-x-[2px]"
                }`}
              />
            </span>
            <span>{isDark ? t("theme.dark") : t("theme.light")}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

