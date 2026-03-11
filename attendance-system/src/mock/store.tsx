"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type {
  AbsenceProof,
  AbsenceReasonType,
  AttendanceDay,
  AttendanceEntry,
  AttendanceStatus,
  Soldier,
  VerificationStatus,
} from "@/types/domain";

const todayKey = () => new Date().toISOString().slice(0, 10);

function makeId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

const seedSoldiers: Soldier[] = [
  {
    id: "s1",
    soldierId: "MIL-0001",
    fullName: "John Carter",
    fullNameLower: "john carter",
    rank: "Private",
    unitId: "Alpha",
    dateJoined: "2025-01-10",
    phone: "+20123456781",
    photo: {
      kind: "URL",
      url: "/male1.png",
    },
    status: "ACTIVE",
  },
  {
    id: "s2",
    soldierId: "MIL-0002",
    fullName: "Sarah Ahmed",
    fullNameLower: "sarah ahmed",
    rank: "Sergeant",
    unitId: "Bravo",
    dateJoined: "2024-11-03",
    phone: "+20123456782",
    photo: {
      kind: "URL",
      url: "/Female.png",
    },
    status: "ACTIVE",
  },
  {
    id: "s3",
    soldierId: "MIL-0003",
    fullName: "Michael Lee",
    fullNameLower: "michael lee",
    rank: "Corporal",
    unitId: "Alpha",
    dateJoined: "2024-09-15",
    phone: "+20123456783",
    photo: {
      kind: "URL",
      url: "/male2.png",
    },
    status: "ACTIVE",
  },
];

export interface SoldierForm {
  soldierId: string;
  fullName: string;
  rank: string;
  unitId: string;
  dateJoined: string;
  phone?: string;
  photoUrl?: string;
}

interface AppState {
  soldiers: Soldier[];
  proofs: AbsenceProof[];
  attendanceByDate: Record<string, AttendanceDay>;
  deserterThresholdDays: number;

  listSoldiers: (params?: { search?: string; unitId?: string }) => Soldier[];
  getSoldier: (id: string) => Soldier | undefined;

  addSoldier: (input: SoldierForm) => Soldier;
  updateSoldier: (id: string, patch: Partial<SoldierForm>) => void;
  archiveSoldier: (id: string) => void;

  getAttendanceDay: (date: string) => AttendanceDay;
  markAttendance: (
    date: string,
    soldierId: string,
    status: AttendanceStatus,
    reasonType?: AbsenceReasonType,
    reasonText?: string
  ) => AttendanceEntry;

  addProof: (payload: {
    soldierId: string;
    date: string;
    url: string;
    notes?: string;
  }) => AbsenceProof;
  reviewProof: (payload: {
    proofId: string;
    status: VerificationStatus;
    decisionNotes?: string;
  }) => void;

  getDerivedDeserterIds: (asOfDate: string) => Set<string>;
}

const Ctx = createContext<AppState | null>(null);

function createSeedAttendance(): Record<string, AttendanceDay> {
  const d = todayKey();
  return {
    [d]: {
      id: d,
      date: d,
      entries: {},
    },
  };
}

export function MockAppProvider({ children }: { children: React.ReactNode }) {
  const [soldiers, setSoldiers] = useState<Soldier[]>(seedSoldiers);
  const [proofs, setProofs] = useState<AbsenceProof[]>([]);
  const [attendanceByDate, setAttendanceByDate] = useState<
    Record<string, AttendanceDay>
  >(createSeedAttendance());

  const deserterThresholdDays = 4;

  const api: AppState = useMemo(() => {
    function listSoldiers(params?: { search?: string; unitId?: string }) {
      const search = params?.search?.trim().toLowerCase();
      const unitId = params?.unitId?.trim();
      return soldiers
        .filter((s) => s.status === "ACTIVE")
        .filter((s) => (!unitId ? true : s.unitId === unitId))
        .filter((s) => {
          if (!search) return true;
          return (
            s.fullNameLower.includes(search) ||
            s.soldierId.toLowerCase().includes(search)
          );
        })
        .sort((a, b) => a.fullName.localeCompare(b.fullName));
    }

    function getSoldier(id: string) {
      return soldiers.find((s) => s.id === id);
    }

    function addSoldier(input: SoldierForm) {
      const id = makeId("soldier");
      const soldier: Soldier = {
        id,
        soldierId: input.soldierId.trim(),
        fullName: input.fullName.trim(),
        fullNameLower: input.fullName.trim().toLowerCase(),
        rank: input.rank.trim(),
        unitId: input.unitId.trim(),
        dateJoined: input.dateJoined,
        phone: input.phone?.trim() || undefined,
        photo: input.photoUrl?.trim()
          ? { kind: "URL", url: input.photoUrl.trim() }
          : undefined,
        status: "ACTIVE",
      };
      setSoldiers((prev) => [soldier, ...prev]);
      return soldier;
    }

    function updateSoldier(id: string, patch: Partial<SoldierForm>) {
      setSoldiers((prev) =>
        prev.map((s) => {
          if (s.id !== id) return s;
          const fullName = patch.fullName ?? s.fullName;
          const photoUrl = patch.photoUrl;
          return {
            ...s,
            soldierId: patch.soldierId ?? s.soldierId,
            fullName,
            fullNameLower: fullName.toLowerCase(),
            rank: patch.rank ?? s.rank,
            unitId: patch.unitId ?? s.unitId,
            dateJoined: patch.dateJoined ?? s.dateJoined,
            phone: patch.phone ?? s.phone,
            photo:
              typeof photoUrl === "string"
                ? photoUrl.trim()
                  ? { kind: "URL", url: photoUrl.trim() }
                  : undefined
                : s.photo,
          };
        })
      );
    }

    function archiveSoldier(id: string) {
      setSoldiers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "INACTIVE" } : s))
      );
    }

    function getAttendanceDay(date: string) {
      return (
        attendanceByDate[date] ?? {
          id: date,
          date,
          entries: {},
        }
      );
    }

    function markAttendance(
      date: string,
      soldierId: string,
      status: AttendanceStatus,
      reasonType?: AbsenceReasonType,
      reasonText?: string
    ) {
      const entry: AttendanceEntry = {
        status,
        reason:
          status === "ABSENT"
            ? {
                type: reasonType ?? "OTHER",
                text: reasonText?.trim() || undefined,
              }
            : null,
        markedAt: new Date().toISOString(),
        markedBy: "demo-officer",
        proofStatus: "NONE",
        proofId: null,
      };

      setAttendanceByDate((prev) => {
        const day = prev[date] ?? { id: date, date, entries: {} };
        return {
          ...prev,
          [date]: {
            ...day,
            entries: {
              ...day.entries,
              [soldierId]: entry,
            },
          },
        };
      });

      return entry;
    }

    function addProof(payload: {
      soldierId: string;
      date: string;
      url: string;
      notes?: string;
    }) {
      const proof: AbsenceProof = {
        id: makeId("proof"),
        soldierId: payload.soldierId,
        date: payload.date,
        url: payload.url.trim(),
        notes: payload.notes?.trim() || undefined,
        uploadedAt: new Date().toISOString(),
        uploadedBy: "demo-officer",
        status: "PENDING",
      };
      setProofs((prev) => [proof, ...prev]);

      setAttendanceByDate((prev) => {
        const day = prev[payload.date] ?? {
          id: payload.date,
          date: payload.date,
          entries: {},
        };
        const existing = day.entries[payload.soldierId];
        if (!existing) return prev;
        return {
          ...prev,
          [payload.date]: {
            ...day,
            entries: {
              ...day.entries,
              [payload.soldierId]: {
                ...existing,
                proofStatus: "PENDING",
                proofId: proof.id,
              },
            },
          },
        };
      });

      return proof;
    }

    function reviewProof(payload: {
      proofId: string;
      status: VerificationStatus;
      decisionNotes?: string;
    }) {
      setProofs((prev) =>
        prev.map((p) => {
          if (p.id !== payload.proofId) return p;
          return {
            ...p,
            status: payload.status,
            reviewedAt: new Date().toISOString(),
            reviewedBy: "demo-officer",
            decisionNotes: payload.decisionNotes?.trim() || undefined,
          };
        })
      );

      const proof = proofs.find((p) => p.id === payload.proofId);
      if (!proof) return;

      setAttendanceByDate((prev) => {
        const day = prev[proof.date];
        if (!day) return prev;
        const existing = day.entries[proof.soldierId];
        if (!existing) return prev;
        const proofStatus =
          payload.status === "VERIFIED"
            ? "VERIFIED"
            : payload.status === "REJECTED"
              ? "REJECTED"
              : "PENDING";
        return {
          ...prev,
          [proof.date]: {
            ...day,
            entries: {
              ...day.entries,
              [proof.soldierId]: {
                ...existing,
                proofStatus,
              },
            },
          },
        };
      });
    }

    function getDerivedDeserterIds(asOfDate: string) {
      // Demo logic: deserter if absent for >= threshold days with no VERIFIED proof
      const deserters = new Set<string>();

      const dates = Object.keys(attendanceByDate)
        .filter((d) => d <= asOfDate)
        .sort();

      for (const s of soldiers.filter((x) => x.status === "ACTIVE")) {
        let streak = 0;
        for (let i = dates.length - 1; i >= 0; i--) {
          const day = attendanceByDate[dates[i]];
          const e = day?.entries[s.id];
          if (!e) continue;
          if (e.status === "ABSENT" && e.proofStatus !== "VERIFIED") {
            streak += 1;
          } else if (e.status === "PRESENT") {
            break;
          }
        }
        if (streak >= deserterThresholdDays) deserters.add(s.id);
      }
      return deserters;
    }

    return {
      soldiers,
      proofs,
      attendanceByDate,
      deserterThresholdDays,
      listSoldiers,
      getSoldier,
      addSoldier,
      updateSoldier,
      archiveSoldier,
      getAttendanceDay,
      markAttendance,
      addProof,
      reviewProof,
      getDerivedDeserterIds,
    };
  }, [attendanceByDate, proofs, soldiers]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useMockApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useMockApp must be used inside MockAppProvider");
  return v;
}

