"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";

export function TopNav() {
  const online = useOnlineStatus();
  const [hydrated, setHydrated] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Avoid hydration mismatch by using a stable initial value on the server
  const isOnline = hydrated ? online : true;
  const date = new Date().toISOString().slice(0, 10);

  return (
    <header className="sticky top-0 z-20 border-b border-[#02254E] bg-[#02254E] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <Link
              href="/"
              className="rounded-md border border-white/40 bg-white/10 px-3 py-1.5 text-xs text-white"
            >
              {t("nav.dashboard")}
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-semibold tracking-wide text-white">
              {t("app.title")}
            </div>
            <div className="text-xs text-slate-200">
              {t("app.subtitle")} • {date}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isOnline
                ? "bg-emerald-500/25 text-emerald-50"
                : "bg-amber-500/30 text-amber-50"
            }`}
          >
            {isOnline ? t("top.online") : t("top.offline")}
          </div>
          <div className="rounded-full bg-white px-3 py-1 text-xs text-[#02254E] ring-1 ring-white/40">
            {t("top.roleOfficer")}
          </div>
          <div className="ml-2 hidden sm:block">
            <div className="h-16 w-16 overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/20">
              <Image
                src="/logo1.png"
                alt="Logo"
                width={96}
                height={96}
                className="h-full w-full object-contain p-1"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

