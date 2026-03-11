/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useMockApp } from "@/mock/store";
import type { AbsenceReasonType } from "@/types/domain";

function badgeClass(status: string) {
  if (status === "PRESENT") return "bg-emerald-900/40 text-emerald-200";
  if (status === "ABSENT") return "bg-rose-900/40 text-rose-200";
  return "bg-zinc-800/60 text-zinc-200";
}

export default function SoldierProfilePage() {
  const { id } = useParams<{ id: string }>();
  const app = useMockApp();
  const soldier = app.getSoldier(id);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const [proofUrl, setProofUrl] = useState("");
  const [proofNotes, setProofNotes] = useState("");
  const [showProof, setShowProof] = useState(false);

  const day = app.getAttendanceDay(today);
  const todayEntry = day.entries[id];

  const soldierProofs = useMemo(
    () => app.proofs.filter((p) => p.soldierId === id),
    [app.proofs, id]
  );

  const history = useMemo(() => {
    const dates = Object.keys(app.attendanceByDate).sort().slice(-14).reverse();
    return dates.map((d) => ({ date: d, entry: app.attendanceByDate[d]?.entries[id] }));
  }, [app.attendanceByDate, id]);

  if (!soldier) {
    return (
      <div className="rounded-lg border border-[#02254E]/30 bg-[#02254E]/5p-6">
        <div className="text-sm text-[#080c12]">Soldier not found.</div>
        <Link href="/soldiers" className="mt-3 inline-block text-sm underline">
          Back to soldiers
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-lg font-semibold tracking-wide">Soldier Profile</div>
          <div className="text-sm text-[#080c12]">
            {soldier.fullName} • {soldier.soldierId}
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/soldiers"
            className="rounded-md border border-[#02254E]/30 bg-[#02254E]/5px-3 py-2 text-sm hover:border-[#6B7D3A]"
          >
            Back
          </Link>
          <button
            onClick={() => setShowProof(true)}
            className="rounded-md bg-[#6B7D3A] px-3 py-2 text-sm font-semibold text-[#9fcffc] hover:brightness-110"
          >
            Add proof link
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-[#02254E]/30 bg-[#02254E]/5 px-4 py-4 lg:col-span-1">
          <div className="flex gap-4">
            <div className="h-20 w-20 overflow-hidden rounded border border-[#02254E]/30 bg-[#02254E]/10">
              {soldier.photo?.kind === "URL" && soldier.photo.url ? (
                <img src={soldier.photo.url} alt={soldier.fullName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-[#080c12]">N/A</div>
              )}
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-semibold">{soldier.fullName}</div>
              <div className="mt-1 text-xs text-[#080c12]">{soldier.soldierId}</div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-white px-2 py-1 text-[#02254E] ring-1 ring-[#02254E]/40">
                  Rank: <span className="font-semibold">{soldier.rank}</span>
                </span>
                <span className="rounded-full bg-white px-2 py-1 text-[#02254E] ring-1 ring-[#02254E]/40">
                  Unit: <span className="font-semibold">{soldier.unitId}</span>
                </span>
              </div>
              <div className="mt-3 text-xs text-[#080c12]">
                Joined: <span className="text-[#E6EAE7]">{soldier.dateJoined}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-md border border-[#02254E]/30 bg-[#02254E]/5p-3">
            <div className="text-xs text-[#080c12]">Today’s status</div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${badgeClass(todayEntry?.status ?? "")}`}>
                {todayEntry?.status ?? "—"}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => app.markAttendance(today, soldier.id, "PRESENT")}
                  className="rounded-md border border-[#02254E]/30 bg-[#02254E]/5px-3 py-1.5 text-xs hover:border-[#6B7D3A]"
                >
                  Present
                </button>
                <button
                  onClick={() => app.markAttendance(today, soldier.id, "ABSENT", "OTHER" as AbsenceReasonType, "Not specified")}
                  className="rounded-md border border-[#02254E]/30 bg-[#02254E]/5px-3 py-1.5 text-xs hover:border-[#6B7D3A]"
                >
                  Absent
                </button>
              </div>
            </div>
            {todayEntry?.status === "ABSENT" && (
              <div className="mt-2 text-xs text-[#080c12]">
                Reason: <span className="text-[#E6EAE7]">{todayEntry.reason?.type}</span>
                {todayEntry.reason?.text ? (
                  <span className="text-[#080c12]"> ({todayEntry.reason.text})</span>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-[#02254E]/30 bg-[#02254E]/5 px-4 py-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Attendance history (last 14 marked days)</div>
            <div className="text-xs text-[#080c12]">Demo data updates as you mark</div>
          </div>
          <div className="mt-3 overflow-x-auto rounded-md border border-[#2A3A30]">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-[#2A3A30] text-xs uppercase tracking-wider text-[#080c12]">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Reason</th>
                  <th className="px-3 py-2">Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2A23]">
                {history.map((h) => (
                  <tr key={h.date} className="hover:bg-[#9fcffc]/40">
                    <td className="px-3 py-2 text-[#080c12]">{h.date}</td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${badgeClass(h.entry?.status ?? "")}`}>
                        {h.entry?.status ?? "—"}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[#080c12]">
                      {h.entry?.status === "ABSENT" ? `${h.entry.reason?.type ?? ""}${h.entry.reason?.text ? ` (${h.entry.reason.text})` : ""}` : "—"}
                    </td>
                    <td className="px-3 py-2 text-[#080c12]">
                      {h.entry?.proofStatus && h.entry.proofStatus !== "NONE" ? h.entry.proofStatus : "—"}
                    </td>
                  </tr>
                ))}
                {!history.length && (
                  <tr>
                    <td className="px-3 py-8 text-center text-sm text-[#080c12]" colSpan={4}>
                      No attendance marked yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <div className="text-sm font-semibold">Proof documents</div>
            <div className="mt-2 grid gap-2">
              {soldierProofs.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col gap-1 rounded-md border border-[#02254E]/30 bg-[#02254E]/5p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-[#080c12]">
                      Date: <span className="text-[#E6EAE7]">{p.date}</span> •{" "}
                      <span className="text-[#E6EAE7]">{p.status}</span>
                    </div>
                    <a href={p.url} target="_blank" rel="noreferrer" className="truncate text-sm underline">
                      {p.url}
                    </a>
                    {p.notes ? <div className="text-xs text-[#080c12]">{p.notes}</div> : null}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href="/proofs"
                      className="rounded-md border border-[#02254E]/30 bg-[#02254E]/5px-3 py-1.5 text-xs hover:border-[#6B7D3A]"
                    >
                      Review queue
                    </Link>
                  </div>
                </div>
              ))}
              {!soldierProofs.length && (
                <div className="rounded-md border border-[#02254E]/30 bg-[#02254E]/5p-3 text-sm text-[#080c12]">
                  No proofs uploaded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-lg border border-[#02254E]/30 bg-white">
            <div className="flex items-center justify-between border-b border-[#2A3A30] px-4 py-3">
              <div className="text-sm font-semibold">Add absence proof (external link)</div>
              <button
                onClick={() => setShowProof(false)}
                className="rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-900 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
            <div className="grid gap-3 px-4 py-4">
              <div>
                <label className="text-xs text-[#080c12]">Proof URL</label>
                <input
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#02254E]"
                  placeholder="https://drive.google.com/... or https://res.cloudinary.com/..."
                />
              </div>
              <div>
                <label className="text-xs text-[#080c12]">Notes (optional)</label>
                <textarea
                  value={proofNotes}
                  onChange={(e) => setProofNotes(e.target.value)}
                  className="mt-1 h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#02254E]"
                  placeholder="Any context for the reviewer..."
                />
              </div>
              <div className="text-xs text-[#080c12]">
                Spark plan constraint: we store only an external link (no Firebase Storage).
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-[#2A3A30] px-4 py-3">
              <button
                onClick={() => setShowProof(false)}
                className="rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-900 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!proofUrl.trim()) return;
                  app.addProof({ soldierId: soldier.id, date: today, url: proofUrl, notes: proofNotes });
                  setProofUrl("");
                  setProofNotes("");
                  setShowProof(false);
                }}
                className="rounded-md bg-[#02254E] px-3 py-2 text-sm font-semibold text-white hover:bg-[#041a36]"
              >
                Save proof
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

