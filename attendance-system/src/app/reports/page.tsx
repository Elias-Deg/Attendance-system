"use client";

import { useMemo } from "react";
import { useMockApp } from "@/mock/store";
import { exportAttendanceReport } from "@/services/reports.service";
import { downloadBlob } from "@/utils/download";
import { useI18n } from "@/i18n/I18nProvider";

export default function ReportsPage() {
  const app = useMockApp();
  const { t } = useI18n();
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const soldiers = useMemo(() => app.listSoldiers({}), [app]);
  const day = app.getAttendanceDay(today);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-lg font-semibold tracking-wide">
            {t("reports.title")}
          </div>
          <div className="text-sm text-[#080c12]">
            {t("reports.subtitle")}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-[#0b1f3b]/30 bg-[#0b1f3b]/5 p-4">
          <div className="text-sm font-semibold">{t("reports.daily")}</div>
          <div className="mt-1 text-sm text-[#080c12]">
            Date: <span className="text-[#E6EAE7]">{today}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => {
                const blob = exportAttendanceReport(soldiers, [day]);
                downloadBlob(blob, `attendance_${today}.csv`);
              }}
              className="rounded-md bg-[#02254E] px-3 py-2 text-sm font-semibold text-white hover:bg-[#041a36]"
            >
              {t("reports.exportCsv")}
            </button>
          </div>
          <div className="mt-3 text-xs text-[#080c12]">
            {t("reports.plan")}
          </div>
        </div>

        <div className="rounded-lg border border-[#0b1f3b]/30 bg-[#0b1f3b]/5 p-4">
          <div className="text-sm font-semibold">{t("reports.deserterList")}</div>
          <div className="mt-1 text-sm text-[#080c12]">
            Derived using threshold: {app.deserterThresholdDays} absent days (unverified).
          </div>
          <div className="mt-4">
            <div className="text-xs text-[#080c12]">
              {t("reports.deserterCountLabel")}
            </div>
            <div className="mt-1 text-2xl font-semibold">
              {app.getDerivedDeserterIds(today).size}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

