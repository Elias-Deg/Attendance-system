"use client";

import type React from "react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export type ThemeMode = "dark" | "light";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const isDark = theme === "dark";

  return (
    <div
      className={
        isDark
          ? "flex min-h-screen bg-[#021e3a] text-slate-50"
          : "flex min-h-screen bg-white text-slate-900"
      }
    >
      <Sidebar
        theme={theme}
        onToggleTheme={() =>
          setTheme((prev) => (prev === "dark" ? "light" : "dark"))
        }
      />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav />
        <div className="min-w-0 flex-1 px-4 py-6">{children}</div>
      </div>
    </div>
  );
}


