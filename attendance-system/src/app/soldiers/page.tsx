/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMockApp, type SoldierForm } from "@/mock/store";

const emptyForm: SoldierForm = {
  soldierId: "",
  fullName: "",
  rank: "",
  unitId: "",
  dateJoined: new Date().toISOString().slice(0, 10),
  phone: "",
  photoUrl: "",
};

export default function SoldiersPage() {
  const app = useMockApp();
  const [search, setSearch] = useState("");
  const [unitId, setUnitId] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<SoldierForm>(emptyForm);

  const soldiers = useMemo(
    () =>
      app.listSoldiers({
        search: search.trim() ? search.trim() : undefined,
        unitId: unitId.trim() ? unitId.trim() : undefined,
      }),
    [app, search, unitId]
  );

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-lg font-semibold tracking-wide text-slate-900">
            Soldiers
          </div>
          <div className="text-sm text-slate-600">
            Register, edit, and manage soldier records (frontend demo).
          </div>
        </div>
        <button
          onClick={() => {
            setForm(emptyForm);
            setShowCreate(true);
          }}
          className="w-fit rounded-md border border-sky-300 bg-sky-100 px-3 py-2 text-sm text-slate-900 hover:bg-sky-200"
        >
          + Register soldier
        </button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className="text-xs text-slate-700">Search (Name / ID)</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400"
            placeholder="Search soldiers..."
          />
        </div>
        <div>
          <label className="text-xs text-slate-700">Unit</label>
          <input
            value={unitId}
            onChange={(e) => setUnitId(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400"
            placeholder="Alpha / Bravo ..."
          />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-sky-50 text-xs uppercase tracking-wider text-slate-600">
            <tr>
              <th className="px-3 py-3">Photo</th>
              <th className="px-3 py-3">Name</th>
              <th className="px-3 py-3">Soldier ID</th>
              <th className="px-3 py-3">Rank</th>
              <th className="px-3 py-3">Unit</th>
              <th className="px-3 py-3">Joined</th>
              <th className="px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {soldiers.map((s) => (
              <tr key={s.id} className="hover:bg-sky-50">
                <td className="px-3 py-3">
                  <div className="h-10 w-10 overflow-hidden rounded border border-slate-200 bg-sky-100">
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
                  </div>
                </td>
                <td className="px-3 py-3 font-medium">
                  <Link href={`/soldiers/${s.id}`} className="hover:underline">
                    {s.fullName}
                  </Link>
                </td>
                    <td className="px-3 py-3 text-slate-700">{s.soldierId}</td>
                <td className="px-3 py-3">{s.rank}</td>
                    <td className="px-3 py-3 text-slate-700">{s.unitId}</td>
                    <td className="px-3 py-3 text-slate-700">{s.dateJoined}</td>
                    <td className="px-3 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/soldiers/${s.id}`}
                      className="rounded-md border border-sky-300 bg-sky-100 px-3 py-1.5 text-xs text-slate-900 hover:bg-sky-200"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => app.archiveSoldier(s.id)}
                      className="rounded-md border border-sky-300 bg-sky-100 px-3 py-1.5 text-xs text-slate-900 hover:bg-sky-200"
                    >
                      Archive
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {!soldiers.length && (
              <tr>
                <td
                  className="px-3 py-10 text-center text-sm text-slate-600"
                  colSpan={7}
                >
                  No soldiers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-lg border border-slate-200 bg-white">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <div className="text-sm font-semibold text-slate-900">
                Register soldier
              </div>
              <button
                onClick={() => setShowCreate(false)}
                className="rounded-md border border-slate-300 bg-sky-50 px-2 py-1 text-xs text-slate-900 hover:bg-sky-100"
              >
                Close
              </button>
            </div>

            <div className="grid gap-3 px-4 py-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label className="text-xs text-slate-700">Soldier ID</label>
                <input
                  value={form.soldierId}
                  onChange={(e) => setForm({ ...form, soldierId: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-xs text-slate-700">Full name</label>
                <input
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs text-slate-700">Rank</label>
                <input
                  value={form.rank}
                  onChange={(e) => setForm({ ...form, rank: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs text-slate-700">Unit / Group</label>
                <input
                  value={form.unitId}
                  onChange={(e) => setForm({ ...form, unitId: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs text-slate-700">Date joined</label>
                <input
                  type="date"
                  value={form.dateJoined}
                  onChange={(e) => setForm({ ...form, dateJoined: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="text-xs text-slate-700">Phone (optional)</label>
                <input
                  value={form.phone ?? ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-slate-700">
                  Photo URL (external link)
                </label>
                <input
                  value={form.photoUrl ?? ""}
                  onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-400"
                  placeholder="https://..."
                />
                <div className="mt-2 text-xs text-slate-600">
                  For the demo, use any public image URL. In production on Firebase
                  Spark, we’d store an external link (Cloudinary/Drive) or a small
                  base64 thumbnail.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-[#2A3A30] px-4 py-3">
              <button
                onClick={() => setShowCreate(false)}
                className="rounded-md border border-sky-300 bg-sky-100 px-3 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!form.soldierId.trim() || !form.fullName.trim()) return;
                  app.addSoldier(form);
                  setShowCreate(false);
                }}
                className="rounded-md bg-[#6B7D3A] px-3 py-2 text-sm font-semibold text-[#9fcffc] hover:brightness-110"
              >
                Save soldier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

