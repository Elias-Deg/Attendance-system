/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMockApp } from "@/mock/store";
import type { VerificationStatus } from "@/types/domain";
import { useI18n } from "@/i18n/I18nProvider";

export default function ProofsPage() {
  const app = useMockApp();
  const [status, setStatus] = useState<VerificationStatus | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const { t } = useI18n();

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
          <div className="text-lg font-semibold tracking-wide">
            {t("proofs.title")}
          </div>
          <div className="text-sm text-[#080c12]">
            {t("proofs.subtitle")}
          </div>
        </div>
        <div className="text-xs text-[#080c12]">
          {t("proofs.total")}:{" "}
          <span className="text-[#E6EAE7]">{app.proofs.length}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className="text-xs text-slate-700">
            {t("proofs.search")}
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#0b1f3b]"
            placeholder="Name / ID / URL / date..."
          />
        </div>
        <div>
          <label className="text-xs text-slate-700">
            {t("proofs.status")}
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#0b1f3b]"
          >
            <option value="ALL">{t("proofs.all")}</option>
            <option value="PENDING">{t("proofs.pending")}</option>
            <option value="VERIFIED">{t("proofs.verified")}</option>
            <option value="REJECTED">{t("proofs.rejected")}</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-2">
        {items.map((p) => {
          const soldier = app.getSoldier(p.soldierId);
          return (
            <div
              key={p.id}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="text-xs text-slate-600">
                    Date: <span className="text-slate-900">{p.date}</span> • Status:{" "}
                    <span className="text-slate-900">{p.status}</span>
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
                    <div className="mt-2 text-sm text-slate-700">{p.notes}</div>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => app.reviewProof({ proofId: p.id, status: "PENDING" })}
                    className="rounded-md border border-[#0b1f3b]/30 bg-[#0b1f3b]/5 px-3 py-1.5 text-xs text-slate-900 hover:bg-[#0b1f3b]/10"
                  >
                    {t("proofs.markPending")}
                  </button>
                  <button
                    onClick={() => app.reviewProof({ proofId: p.id, status: "VERIFIED" })}
                    className="rounded-md border border-[#2A3A30] bg-emerald-950/40 px-3 py-1.5 text-xs text-emerald-200 hover:border-emerald-500/60"
                  >
                    {t("proofs.verify")}
                  </button>
                  <button
                    onClick={() => app.reviewProof({ proofId: p.id, status: "REJECTED" })}
                    className="rounded-md border border-[#2A3A30] bg-rose-950/40 px-3 py-1.5 text-xs text-rose-200 hover:border-rose-500/60"
                  >
                    {t("proofs.reject")}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {!items.length && (
          <div className="rounded-lg border border-slate-200 bg-[#0b1f3b]/5 p-8 text-center text-sm text-slate-700">
            {t("proofs.empty")}
          </div>
        )}
      </div>
    </div>
  );
}

