export type UserRole = "ADMIN" | "OFFICER";

export interface AppUser {
  uid: string;
  email: string;
  displayName?: string | null;
  role: UserRole;
  campId: string;
}

export interface Unit {
  id: string;
  name: string;
  code: string;
  active: boolean;
}

export type SoldierStatus = "ACTIVE" | "INACTIVE";

export interface SoldierPhoto {
  kind: "URL" | "BASE64";
  url?: string;
  base64?: string;
}

export interface Soldier {
  id: string; // Firestore doc id
  soldierId: string;
  fullName: string;
  fullNameLower: string;
  rank: string;
  unitId: string;
  dateJoined: string; // ISO date
  phone?: string;
  photo?: SoldierPhoto;
  status: SoldierStatus;
}

export type AttendanceStatus = "PRESENT" | "ABSENT";

export type AbsenceReasonType = "FAMILY" | "HEALTH" | "DUTY" | "OTHER";

export interface AbsenceReason {
  type: AbsenceReasonType;
  text?: string;
}

export type ProofStatus = "NONE" | "PENDING" | "VERIFIED" | "REJECTED";

export interface AttendanceEntry {
  status: AttendanceStatus;
  reason?: AbsenceReason | null;
  markedBy: string;
  markedAt: string; // ISO
  proofStatus: ProofStatus;
  proofId?: string | null;
}

export interface AttendanceDay {
  id: string; // date key
  date: string;
  entries: Record<string, AttendanceEntry>;
}

export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export interface AbsenceProof {
  id: string;
  soldierId: string; // Soldier doc id in real backend
  date: string; // YYYY-MM-DD
  url: string; // external link (Cloudinary/Drive/etc)
  notes?: string;
  uploadedAt: string; // ISO
  uploadedBy: string;
  status: VerificationStatus;
  reviewedAt?: string;
  reviewedBy?: string;
  decisionNotes?: string;
}

export type VerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export interface AbsenceProof {
  id: string;
  soldierId: string; // Soldier doc id in real backend
  date: string; // YYYY-MM-DD
  url: string; // external link (Cloudinary/Drive/etc)
  notes?: string;
  uploadedAt: string; // ISO
  uploadedBy: string;
  status: VerificationStatus;
  reviewedAt?: string;
  reviewedBy?: string;
  decisionNotes?: string;
}

