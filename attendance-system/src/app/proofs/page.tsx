/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMockApp } from "@/mock/store";
import type { VerificationStatus } from "@/types/domain";

export default function ProofsPage() {
  const app = useMockApp();
  const [status, setStatus] = useState<VerificationStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const items = useMemo(() => {
    const s = search.trim().toLowerCase();
    return app.proofs
      .filter((p) => (status === "ALL" ? true : p.status === status))
      .filter((p) => {
        if (!s) return true;
        const soldier = app.getSoldier(p.soldierId);
        return (
          p.url.toLowerCase().includes(s) ||
          p.date.includes(s) ||
          (soldier?.fullNameLower.includes(s) ?? false) ||
          (soldier?.soldierId.toLowerCase().includes(s) ?? false)
        );
      });
  }, [app, search, status]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-lg font-semibold tracking-wide">Proof Verification</div>
          <div className="text-sm text-[#080c12]">
            Review absence proof links and mark them as Verified/Rejected.
          </div>
        </div>
        <div className="text-xs text-[#080c12]">
          Total proofs: <span className="text-[#E6EAE7]">{app.proofs.length}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className="text-xs text-[#080c12]">Search</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 w-full rounded-md border border-sky-300 bg-sky-100 px-3 py-2 text-sm outline-none focus:border-[#6B7D3A]"
            placeholder="Name / ID / URL / date..."
          />
        </div>
        <div>
          <label className="text-xs text-[#080c12]">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="mt-1 w-full rounded-md border border-sky-300 bg-sky-100 px-3 py-2 text-sm outline-none focus:border-[#6B7D3A]"
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="VERIFIED">Verified</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-2">
        {items.map((p) => {
          const soldier = app.getSoldier(p.soldierId);
          return (
            <div
              key={p.id}
              className="rounded-lg border border-sky-300 bg-sky-100 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="text-xs text-[#080c12]">
                    Date: <span className="text-[#E6EAE7]">{p.date}</span> • Status:{" "}
                    <span className="text-[#E6EAE7]">{p.status}</span>
                  </div>
                  <div className="mt-1">
                    {soldier ? (
                      <Link href={`/soldiers/${soldier.id}`} className="text-sm font-semibold hover:underline">
                        {soldier.fullName} ({soldier.soldierId})
                      </Link>
                    ) : (
                      <div className="text-sm font-semibold">Unknown soldier</div>
                    )}
                  </div>
                  <a href={p.url} target="_blank" rel="noreferrer" className="mt-2 block truncate text-sm underline">
                    {p.url}
                  </a>
                  {p.notes ? (
                    <div className="mt-2 text-sm text-[#080c12]">{p.notes}</div>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => app.reviewProof({ proofId: p.id, status: "PENDING" })}
                    className="rounded-md border border-sky-300 bg-sky-100 px-3 py-1.5 text-xs hover:border-[#6B7D3A]"
                  >
                    Mark pending
                  </button>
                  <button
                    onClick={() => app.reviewProof({ proofId: p.id, status: "VERIFIED" })}
                    className="rounded-md border border-[#2A3A30] bg-emerald-950/40 px-3 py-1.5 text-xs text-emerald-200 hover:border-emerald-500/60"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => app.reviewProof({ proofId: p.id, status: "REJECTED" })}
                    className="rounded-md border border-[#2A3A30] bg-rose-950/40 px-3 py-1.5 text-xs text-rose-200 hover:border-rose-500/60"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {!items.length && (
          <div className="rounded-lg border border-sky-300 bg-sky-100 p-8 text-center text-sm text-[#080c12]">
            No proofs found. Add one from a soldier profile.
          </div>
        )}
      </div>
    </div>
  );
}

