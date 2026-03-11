import type { AttendanceDay, Soldier } from "@/types/domain";

export function exportAttendanceReport(
  soldiers: Soldier[],
  days: AttendanceDay[]
): Blob {
  const rows: Record<string, string>[] = [];

  for (const day of days) {
    for (const soldier of soldiers) {
      const entry = day.entries[soldier.id];
      rows.push({
        Date: day.date,
        SoldierID: soldier.soldierId,
        Name: soldier.fullName,
        Rank: soldier.rank,
        Unit: soldier.unitId,
        Status: entry?.status ?? "",
        AbsenceReason: entry?.reason?.type ?? "",
        AbsenceText: entry?.reason?.text ?? "",
        ProofStatus: entry?.proofStatus ?? "",
      });
    }
  }

  const headers = Object.keys(rows[0] ?? {});
  const escape = (v: string) => {
    if (v.includes('"') || v.includes(",") || v.includes("\n")) {
      return `"${v.replaceAll('"', '""')}"`;
    }
    return v;
  };
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h] ?? "")).join(",")),
  ].join("\n");

  return new Blob([csv], { type: "text/csv" });
}

