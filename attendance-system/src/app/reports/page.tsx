"use client";

import { useMemo } from "react";
import { useMockApp } from "@/mock/store";
import { exportAttendanceReport } from "@/services/reports.service";
import { downloadBlob } from "@/utils/download";

export default function ReportsPage() {
  const app = useMockApp();
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const soldiers = useMemo(() => app.listSoldiers({}), [app]);
  const day = app.getAttendanceDay(today);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-lg font-semibold tracking-wide">Reports</div>
          <div className="text-sm text-[#080c12]">
            Export attendance (frontend demo). For now: CSV only.
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-sky-300 bg-sky-100 p-4">
          <div className="text-sm font-semibold">Daily attendance</div>
          <div className="mt-1 text-sm text-[#080c12]">
            Date: <span className="text-[#E6EAE7]">{today}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => {
                const blob = exportAttendanceReport(soldiers, [day]);
                downloadBlob(blob, `attendance_${today}.csv`);
              }}
              className="rounded-md bg-[#6B7D3A] px-3 py-2 text-sm font-semibold text-[#9fcffc] hover:brightness-110"
            >
              Export CSV
            </button>
          </div>
          <div className="mt-3 text-xs text-[#080c12]">
            Production plan: add weekly/monthly range + Excel export when deps are stable.
          </div>
        </div>

        <div className="rounded-lg border border-sky-300 bg-sky-100 p-4">
          <div className="text-sm font-semibold">Deserter list</div>
          <div className="mt-1 text-sm text-[#080c12]">
            Derived using threshold: {app.deserterThresholdDays} absent days (unverified).
          </div>
          <div className="mt-4">
            <div className="text-xs text-[#080c12]">Count</div>
            <div className="mt-1 text-2xl font-semibold">
              {app.getDerivedDeserterIds(today).size}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

