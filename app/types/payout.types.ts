// types/payout.types.ts
export type PayoutStatus = "pending" | "processing" | "paid" | "failed";
export type PayoutMethod = "bank_transfer" | "paypal" | "stripe" | "manual";

export interface PayoutRow {
  id: string;
  reference: string; // human-readable receipt id, e.g. "PO-2026-09-0001"
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string | null;
  };
  county: string;

  // ── period + amounts ──
  periodStart: string; // ISO
  periodEnd: string; // ISO
  grossAmount: number; // instructor earned
  commissionAmount: number; // admin cut
  netAmount: number; // what instructor receives

  // ── payment ──
  status: PayoutStatus;
  method: PayoutMethod;
  paidAt: string | null; // when completed
  failureReason: string | null; // if status === "failed"
  processedBy: string | null; // admin name
  invoiceUrl: string | null; // optional receipt link
  note: string | null;
}

export interface PayoutKpis {
  totalPayouts: number;
  paidThisMonth: number;
  pendingAmount: number;
  failedCount: number;
  totalPaidAllTime: number;
  averagePayout: number;
  topRecipient: { name: string; amount: number } | null;
}
