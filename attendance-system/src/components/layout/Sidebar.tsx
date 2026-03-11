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
    <aside className="hidden min-h-screen w-50 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col md:justify-between">
      <div>
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="h-9 w-9 rounded bg-[#6B7D3A]" />
            <div>
              <div className="text-sm font-semibold tracking-wide text-slate-900">
                Camp Attendance
              </div>
              <div className="text-xs text-slate-500">Demo frontend</div>
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
                    ? "bg-sky-100 text-sky-900 ring-1 ring-sky-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 px-4 py-4">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-300">
          <span>Theme</span>
          <button
            onClick={onToggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-[ #9fcffc] px-3 py-1 text-xs text-slate-50 hover:border-sky-400"
          >
            <span className="h-4 w-8 rounded-full border border-slate-700 bg-[ #9fcffc]">
              <span
                className={`block h-3 w-3 translate-y-[2px] rounded-full bg-sky-400 transition-transform ${
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

