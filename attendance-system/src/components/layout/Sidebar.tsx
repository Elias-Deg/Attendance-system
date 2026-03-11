"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ThemeMode } from "./AppShell";

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/soldiers", label: "Soldiers" },
  { href: "/proofs", label: "Proof Verification" },
  { href: "/reports", label: "Reports" },
];

interface SidebarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Sidebar({ theme, onToggleTheme }: SidebarProps) {
  const pathname = usePathname();
  const isDark = theme === "dark";

  return (
    <aside className="hidden min-h-screen w-52 shrink-0 border-r border-[#011933] bg-[#02254E] md:flex md:flex-col md:justify-between">
      <div>
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 rounded bg-[#F4C648]" />
            <div>
              <div className="text-sm font-semibold tracking-wide text-white">
                Camp Attendance
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
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-[#011933] px-4 py-4">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-200">
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
            <span>{isDark ? "Dark" : "Light"}</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

