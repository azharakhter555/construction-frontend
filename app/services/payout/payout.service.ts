// services/payout/payout.service.ts
import type { PayoutRow, PayoutKpis } from "@/types/payout.types";
import { dummyPayoutRows, computePayoutKpis } from "@/lib/dummy-data/payout.data";

const LATENCY = 400;

let rows: PayoutRow[] = [...dummyPayoutRows];

function applyFilters(list: PayoutRow[], params: Record<string, unknown>): PayoutRow[] {
  let out = [...list];

  // search by name/email/reference
  const search = String(params["search"] ?? "")
    .trim()
    .toLowerCase();
  if (search) {
    out = out.filter((r) =>
      `${r.instructor.firstName} ${r.instructor.lastName} ${r.instructor.email} ${r.reference}`
        .toLowerCase()
        .includes(search)
    );
  }

  // eq filters
  const eq: Array<{ key: keyof PayoutRow; param: string }> = [
    { key: "status", param: "filter.status" },
    { key: "method", param: "filter.method" },
    { key: "county", param: "filter.county" },
  ];
  for (const { key, param } of eq) {
    const v = params[param];
    if (typeof v === "string" && v && v !== "all") {
      out = out.filter((r) => r[key] === v);
    }
  }

  // numeric $gte
  const nums: Array<{ key: keyof PayoutRow; param: string }> = [
    { key: "netAmount", param: "filter.netAmount" },
    { key: "grossAmount", param: "filter.grossAmount" },
  ];
  for (const { key, param } of nums) {
    const raw = params[param];
    if (typeof raw !== "string") continue;
    const m = raw.match(/^\$gte:(.+)$/);
    if (!m) continue;
    const threshold = Number(m[1]!);
    out = out.filter((r) => Number(r[key]) >= threshold);
  }

  // date range on paidAt (or periodStart)
  const dateRaw = params["filter.paidAt"] ?? params["filter.periodStart"];
  if (typeof dateRaw === "string") {
    const btw = dateRaw.match(/^\$btw:(.+),(.+)$/);
    const gte = dateRaw.match(/^\$gte:(.+)$/);
    const lte = dateRaw.match(/^\$lte:(.+)$/);
    const ts = (r: PayoutRow) =>
      r.paidAt ? new Date(r.paidAt).getTime() : new Date(r.periodStart).getTime();

    if (btw) {
      const from = new Date(btw[1]!).getTime();
      const to = new Date(btw[2]!).getTime();
      out = out.filter((r) => ts(r) >= from && ts(r) <= to);
    } else if (gte) {
      const from = new Date(gte[1]!).getTime();
      out = out.filter((r) => ts(r) >= from);
    } else if (lte) {
      const to = new Date(lte[1]!).getTime();
      out = out.filter((r) => ts(r) <= to);
    }
  }

  return out;
}

class PayoutService {
  async getPayoutRows(params: Record<string, unknown> = {}): Promise<{
    data: PayoutRow[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await new Promise((r) => setTimeout(r, LATENCY));

    const filtered = applyFilters(rows, params);
    const page = Number(params["page"] ?? 1);
    const limit = Number(params["limit"] ?? 10);
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;

    return {
      data: filtered.slice(start, start + limit),
      total,
      page,
      totalPages,
    };
  }

  async getKpis(): Promise<{ data: PayoutKpis }> {
    await new Promise((r) => setTimeout(r, LATENCY / 2));
    return { data: computePayoutKpis(rows) };
  }

  async getRow(id: string): Promise<{ data: PayoutRow }> {
    await new Promise((r) => setTimeout(r, LATENCY / 2));
    const found = rows.find((r) => r.id === id);
    if (!found) throw new Error(`Payout not found: ${id}`);
    return { data: found };
  }

  /** Mark a pending/failed payout as paid. */
  async markPaid(id: string): Promise<{ data: PayoutRow }> {
    await new Promise((r) => setTimeout(r, LATENCY));

    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Payout not found: ${id}`);

    const updated: PayoutRow = {
      ...rows[idx]!,
      status: "paid",
      paidAt: new Date().toISOString(),
      failureReason: null,
      processedBy: "Admin",
    };
    rows = [...rows.slice(0, idx), updated, ...rows.slice(idx + 1)];
    return { data: updated };
  }

  /** Retry a failed payout. */
  async retry(id: string): Promise<{ data: PayoutRow }> {
    await new Promise((r) => setTimeout(r, LATENCY));

    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Payout not found: ${id}`);

    const updated: PayoutRow = {
      ...rows[idx]!,
      status: "processing",
      failureReason: null,
      processedBy: "Admin",
    };
    rows = [...rows.slice(0, idx), updated, ...rows.slice(idx + 1)];
    return { data: updated };
  }
}

export const payoutService = new PayoutService();
