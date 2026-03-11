/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AbsenceReasonType, AttendanceStatus } from "@/types/domain";
import { useMockApp } from "@/mock/store";

export default function Home() {
  const app = useMockApp();
  const [search, setSearch] = useState("");
  const [unitId, setUnitId] = useState<string>("");
  const [reasonById, setReasonById] = useState<
    Record<string, AbsenceReasonType>
  >({});
  const [profileId, setProfileId] = useState<string | null>(null);
  const today = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => today.toISOString().slice(0, 10), [today]);

  const soldiers = useMemo(
    () =>
      app.listSoldiers({
        search: search.trim() ? search.trim() : undefined,
        unitId: unitId || undefined,
      }),
    [app, search, unitId]
  );

  const todayEntries = app.getAttendanceDay(todayKey).entries;
  const deserters = app.getDerivedDeserterIds(todayKey);

  const previousKeys = useMemo(() => {
    const base = new Date(todayKey);
    return [1, 2, 3].map((offset) => {
      const d = new Date(base);
      d.setDate(d.getDate() - offset);
      return d.toISOString().slice(0, 10);
    });
  }, [todayKey]);

  const stats = useMemo(() => {
    let present = 0;
    let absent = 0;
    for (const soldier of soldiers) {
      const e = todayEntries[soldier.id];
      if (e?.status === "PRESENT") present += 1;
      if (e?.status === "ABSENT") absent += 1;
    }
    return { total: soldiers.length, present, absent, deserters: deserters.size };
  }, [soldiers, todayEntries, deserters]);

  async function mark(soldier: { id: string }, status: AttendanceStatus) {
    let reasonType: AbsenceReasonType | undefined;
    if (status === "ABSENT") {
      reasonType = reasonById[soldier.id];
      if (!reasonType) {
        return;
      }
    }
    app.markAttendance(todayKey, soldier.id, status, reasonType);
  }

  return (
    <main>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-lg font-semibold tracking-wide">Dashboard</div>
          <div className="text-sm text-[#080c12]">
            Spreadsheet-style attendance for {todayKey}
          </div>
        </div>
        <Link
          href="/soldiers"
          className="w-fit rounded-md border border-[#0b1f3b]/30 bg-[#0b1f3b]/5 px-3 py-2 text-sm text-slate-900 hover:bg-[#0b1f3b]/10"
        >
          Manage soldiers
        </Link>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-[#02254E]/30 bg-[#02254E]/8 px-3 py-3 shadow-sm">
            <div className="text-xs text-slate-700">Total Soldiers</div>
            <div className="mt-1 text-2xl font-semibold">{stats.total}</div>
          </div>
          <div className="rounded-lg border border-[#02254E]/30 bg-[#02254E]/8 px-3 py-3 shadow-sm">
            <div className="text-xs text-slate-700">Present Today</div>
            <div className="mt-1 text-2xl font-semibold">{stats.present}</div>
          </div>
          <div className="rounded-lg border border-[#02254E]/30 bg-[#02254E]/8 px-3 py-3 shadow-sm">
            <div className="text-xs text-slate-700">Absent Today</div>
            <div className="mt-1 text-2xl font-semibold">{stats.absent}</div>
          </div>
          <div className="rounded-lg border border-[#02254E]/30 bg-[#02254E]/8 px-3 py-3 shadow-sm">
            <div className="text-xs text-slate-700">Deserters (derived)</div>
            <div className="mt-1 text-2xl font-semibold">{stats.deserters}</div>
          </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row">
            <div className="flex-1">
              <label className="text-xs text-slate-700">
                Search (Name / ID)
              </label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#02254E]"                placeholder="e.g. MIL-000123 or John"
              />
            </div>
            <div className="w-full sm:w-56">
              <label className="text-xs text-slate-700">Unit</label>
              <input
                value={unitId}
                onChange={(e) => setUnitId(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400"
                placeholder="unit id (for now)"
              />
            </div>
          </div>
          <div className="text-xs text-slate-600">
            Date:{" "}
            <span className="text-slate-900">
              {today.toISOString().slice(0, 10)}
            </span>
          </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-[#02254E] text-xs uppercase tracking-wider text-white">
              <tr>
                <th className="px-3 py-3">Photo</th>
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Soldier ID</th>
                <th className="px-3 py-3">Rank</th>
                <th className="px-3 py-3">Unit</th>
                <th className="px-3 py-3">Last 3 days</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Absence Reason</th>
                <th className="px-3 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2A23]">
              {soldiers.map((s) => {
                const e = todayEntries[s.id];
                const isDeserter = deserters.has(s.id);
                return (
                  <tr
                    key={s.id}
                    className={`hover:bg-[#02254E]/5 ${
                      isDeserter ? "bg-rose-950/20" : ""
                    }`}
                  >
                    <td className="px-3 py-2">
                      <button
                        type="button"
                        onClick={() => setProfileId(s.id)}
                        className="h-10 w-10 overflow-hidden rounded border border-[#02254E]/30 bg-[#02254E]/10"
                      >
                        {s.photo?.kind === "URL" && s.photo.url ? (
                          <img
                            src={s.photo.url}
                            alt={s.fullName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-[#080c12]">
                            N/A
                          </div>
                        )}
                      </button>
                    </td>
                    <td className="px-3 py-2 font-medium">
                      {s.fullName}
                      {isDeserter && (
                        <span className="ml-2 rounded-full bg-rose-900/40 px-2 py-0.5 text-[10px] font-semibold text-rose-200">
                          DESERTER
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-[#080c12]">{s.soldierId}</td>
                    <td className="px-3 py-2">{s.rank}</td>
                    <td className="px-3 py-2 text-[#080c12]">{s.unitId}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        {previousKeys.map((d) => {
                          const prevEntry = app
                            .getAttendanceDay(d)
                            .entries[s.id];
                          let color = "bg-zinc-700";
                          if (prevEntry?.status === "PRESENT")
                            color = "bg-emerald-500";
                          if (prevEntry?.status === "ABSENT")
                            color = "bg-rose-500";
                          return (
                            <span
                              key={d}
                              className={`h-2.5 w-2.5 rounded-full ${color}`}
                            />
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          e?.status === "PRESENT"
                            ? "bg-emerald-900/40 text-emerald-200"
                            : e?.status === "ABSENT"
                              ? "bg-rose-900/40 text-rose-200"
                              : "bg-zinc-800/60 text-zinc-200"
                        }`}
                      >
                        {e?.status ?? "—"}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[#080c12]">
                      <select
                        value={reasonById[s.id] ?? ""}
                        onChange={(e) =>
                          setReasonById((prev) => ({
                            ...prev,
                            [s.id]: e.target.value as AbsenceReasonType,
                          }))
                        }
                        className="w-full rounded-md border border-[#02254E]/30 bg-[#02254E]/5px-2 py-1 text-xs outline-none focus:border-[#6B7D3A]"
                      >
                        <option value="">Select reason</option>
                        <option value="FAMILY">Family Issue</option>
                        <option value="HEALTH">Health Problem</option>
                        <option value="DUTY">Official Duty</option>
                        <option value="OTHER">Other</option>
                      </select>
                      {e?.status === "ABSENT" && e.reason?.type && (
                        <div className="mt-1 text-[11px] text-[#E6EAE7]">
                          {e.reason.type}
                          {e.reason.text ? ` (${e.reason.text})` : ""}
                        </div>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => mark(s, "PRESENT")}
                          className="inline-flex items-center gap-1 rounded-full border border-emerald-400 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800 hover:bg-emerald-100"
                        >
                          Present
                        </button>
                        <button
                          onClick={() => mark(s, "ABSENT")}
                          className="inline-flex items-center gap-1 rounded-full border border-rose-400 bg-rose-50 px-2.5 py-1 text-[11px] font-medium text-rose-800 hover:bg-rose-100"
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!soldiers.length && (
                <tr>
                  <td
                    className="px-3 py-10 text-center text-sm text-[#080c12]"
                    colSpan={8}
                  >
                    No soldiers found. Next step: add Soldier Registration and
                    seed data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>

      {profileId && (() => {
        const soldier = app.getSoldier(profileId);
        if (!soldier) return null;
        const entry = todayEntries[profileId];
        const recentDates = [todayKey, ...previousKeys];
        return (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Soldier profile
                  </div>
                  <div className="mt-0.5 text-xs text-slate-500">
                    Detailed overview for daily review
                  </div>
                </div>
                <button
                  onClick={() => setProfileId(null)}
                  className="rounded-md border border-slate-300 bg-slate-100 px-3 py-1 text-xs text-slate-800 hover:bg-slate-200"
                >
                  Close
                </button>
              </div>

              <div className="px-5 py-5">
                <div className="flex flex-col gap-5 md:flex-row md:items-start">
                  <div className="flex shrink-0 flex-col items-center gap-3 md:items-start">
                    <div className="h-40 w-40 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                      {soldier.photo?.kind === "URL" && soldier.photo.url ? (
                        <img
                          src={soldier.photo.url}
                          alt={soldier.fullName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                          N/A
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xl font-semibold text-slate-900">
                      {soldier.fullName}
                    </div>
                    <div className="mt-1 text-sm text-slate-700">
                      {soldier.rank} • {soldier.unitId}
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border border-slate-200 bg-[#0b1f3b]/5 px-3 py-2">
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                          Soldier ID
                        </div>
                        <div className="mt-1 text-sm text-slate-900">
                          {soldier.soldierId}
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-[#0b1f3b]/5 px-3 py-2">
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                          Date joined
                        </div>
                        <div className="mt-1 text-sm text-slate-900">
                          {soldier.dateJoined}
                        </div>
                      </div>
                      <div className="rounded-lg border border-slate-200 bg-[#0b1f3b]/5 px-3 py-2">
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                          Phone
                        </div>
                        <div className="mt-1 text-sm text-slate-900">
                          {soldier.phone ?? "—"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-[#0b1f3b]/5 px-4 py-3 text-sm text-slate-900">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Today
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-slate-700">Status:</span>
                      <span className="font-semibold">
                        {entry?.status ?? "Not marked"}
                      </span>
                    </div>
                    {entry?.status === "ABSENT" && entry.reason?.type && (
                      <div className="mt-1 text-sm text-slate-900">
                        <span className="text-slate-700">Reason:</span>{" "}
                        <span className="font-semibold">
                          {entry.reason.type}
                          {entry.reason.text ? ` (${entry.reason.text})` : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Recent attendance
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {recentDates.map((d) => {
                        const e = app.getAttendanceDay(d).entries[soldier.id];
                        let badge = "bg-slate-200 text-slate-800";
                        let label = "—";
                        if (e?.status === "PRESENT") {
                          badge = "bg-emerald-100 text-emerald-800";
                          label = "Present";
                        } else if (e?.status === "ABSENT") {
                          badge = "bg-rose-100 text-rose-800";
                          label = "Absent";
                        }
                        return (
                          <div
                            key={d}
                            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1"
                          >
                            <span className="text-[11px] text-slate-600">
                              {d}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${badge}`}
                            >
                              {label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      </main>
  );
}
