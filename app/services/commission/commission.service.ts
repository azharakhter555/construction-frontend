// services/commission/commission.service.ts
import type { CommissionRow, CommissionKpis } from "@/types/commission.types";
import { dummyCommissionRows, computeCommissionKpis } from "@/lib/dummy-data/commission.data";

const LATENCY = 400;

// ── in-memory store so overrides survive within the session ──
let rows: CommissionRow[] = [...dummyCommissionRows];

function applyFilters(list: CommissionRow[], params: Record<string, unknown>): CommissionRow[] {
  let out = [...list];

  // search
  const search = String(params["search"] ?? "")
    .trim()
    .toLowerCase();
  if (search) {
    out = out.filter((r) =>
      `${r.user.firstName} ${r.user.lastName} ${r.user.email}`.toLowerCase().includes(search)
    );
  }

  // eq filters
  const eq: Array<{ key: keyof CommissionRow; param: string }> = [
    { key: "county", param: "filter.county" },
    { key: "transmission", param: "filter.transmission" },
  ];
  for (const { key, param } of eq) {
    const v = params[param];
    if (typeof v === "string" && v && v !== "all") {
      out = out.filter((r) => r[key] === v);
    }
  }

  // overrideStatus — custom filter, not a db column
  const overrideFilter = params["filter.overrideStatus"];
  if (typeof overrideFilter === "string" && overrideFilter !== "all") {
    if (overrideFilter === "custom") {
      out = out.filter((r) => r.overrideRate !== null || r.overrideType === "fixed");
    } else if (overrideFilter === "default") {
      out = out.filter((r) => r.overrideRate === null && r.overrideType !== "fixed");
    }
  }

  // numeric $gte
  const nums: Array<{ key: keyof CommissionRow; param: string }> = [
    { key: "yearsOfExperience", param: "filter.yearsOfExperience" },
    { key: "monthlyCommission", param: "filter.monthlyCommission" },
    { key: "effectiveRate", param: "filter.effectiveRate" },
  ];
  for (const { key, param } of nums) {
    const raw = params[param];
    if (typeof raw !== "string") continue;
    const m = raw.match(/^\$gte:(.+)$/);
    if (!m) continue;
    const threshold = Number(m[1]!);
    out = out.filter((r) => Number(r[key]) >= threshold);
  }

  // date range on lastOverrideAt
  const dateRaw = params["filter.lastOverrideAt"];
  if (typeof dateRaw === "string") {
    const btw = dateRaw.match(/^\$btw:(.+),(.+)$/);
    const gte = dateRaw.match(/^\$gte:(.+)$/);
    const lte = dateRaw.match(/^\$lte:(.+)$/);
    const ts = (r: CommissionRow) => (r.lastOverrideAt ? new Date(r.lastOverrideAt).getTime() : 0);

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

class CommissionService {
  async getCommissionRows(params: Record<string, unknown> = {}): Promise<{
    data: CommissionRow[];
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

  async getKpis(): Promise<{ data: CommissionKpis }> {
    await new Promise((r) => setTimeout(r, LATENCY / 2));
    return { data: computeCommissionKpis(rows) };
  }

  async getRow(id: string): Promise<{ data: CommissionRow }> {
    await new Promise((r) => setTimeout(r, LATENCY / 2));
    const found = rows.find((r) => r.id === id);
    if (!found) throw new Error(`Commission row not found: ${id}`);
    return { data: found };
  }

  async updateOverride(
    id: string,
    payload: {
      overrideType: "percentage" | "fixed";
      overrideRate: number | null;
      fixedFee: number | null;
      note: string | null;
    }
  ): Promise<{ data: CommissionRow }> {
    await new Promise((r) => setTimeout(r, LATENCY));

    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Commission row not found: ${id}`);

    const current = rows[idx]!;
    const effectiveRate =
      payload.overrideType === "fixed"
        ? current.defaultRate
        : (payload.overrideRate ?? current.defaultRate);

    const monthlyCommission =
      payload.overrideType === "fixed" && payload.fixedFee != null
        ? payload.fixedFee * current.monthlyLessons
        : (current.monthlyGross * effectiveRate) / 100;

    const updated: CommissionRow = {
      ...current,
      overrideType: payload.overrideType,
      overrideRate: payload.overrideType === "percentage" ? payload.overrideRate : null,
      fixedFee: payload.overrideType === "fixed" ? payload.fixedFee : null,
      effectiveRate,
      monthlyCommission: Number(monthlyCommission.toFixed(2)),
      lastOverrideAt: new Date().toISOString(),
      overriddenBy: "Admin",
      note: payload.note,
    };

    rows = [...rows.slice(0, idx), updated, ...rows.slice(idx + 1)];
    return { data: updated };
  }

  async clearOverride(id: string): Promise<{ data: CommissionRow }> {
    await new Promise((r) => setTimeout(r, LATENCY));

    const idx = rows.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error(`Commission row not found: ${id}`);

    const current = rows[idx]!;
    const monthlyCommission = (current.monthlyGross * current.defaultRate) / 100;

    const updated: CommissionRow = {
      ...current,
      overrideRate: null,
      overrideType: "percentage",
      fixedFee: null,
      effectiveRate: current.defaultRate,
      monthlyCommission: Number(monthlyCommission.toFixed(2)),
      lastOverrideAt: null,
      overriddenBy: null,
      note: null,
    };

    rows = [...rows.slice(0, idx), updated, ...rows.slice(idx + 1)];
    return { data: updated };
  }
}

export const commissionService = new CommissionService();
