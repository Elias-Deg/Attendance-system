"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export function TopNav() {
  const online = useOnlineStatus();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Avoid hydration mismatch by using a stable initial value on the server
  const isOnline = hydrated ? online : true;
  const date = new Date().toISOString().slice(0, 10);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Link
              href="/"
              className="rounded-md border border-slate-700 bg-[ #9fcffc] px-3 py-1.5 text-xs text-slate-50"
            >
              Home
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-semibold tracking-wide text-slate-900">
              Attendance Management
            </div>
            <div className="text-xs text-slate-500">
              Military Training Camp • {date}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isOnline
                ? "bg-emerald-900/60 text-emerald-200"
                : "bg-amber-900/60 text-amber-200"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </div>
          <div className="rounded-full bg-[ #9fcffc] px-3 py-1 text-xs text-slate-700 ring-1 ring-slate-700">
            Role: Officer
          </div>
        </div>
      </div>
    </header>
  );
}

