// services/performance/performance.service.ts
import type { InstructorPerformance, PerformanceKpis } from "@/types/performance.types";
import { dummyPerformanceRows, computeKpis } from "@/lib/dummy-data/performance.data";

// Fake latency so the UI shows its loading states
const LATENCY = 400;

/**
 * Filter a performance row against the params that `buildQueryParams` emits.
 * Supports: search, county, transmission, yearsOfExperience ($gte),
 *           rating ($gte), passRate ($gte), totalReviews ($gte),
 *           lastReviewAt ($btw / $gte / $lte).
 */
function applyFilters(
  rows: InstructorPerformance[],
  params: Record<string, unknown>
): InstructorPerformance[] {
  let out = [...rows];

  // ── Search ──
  const search = String(params["search"] ?? "")
    .trim()
    .toLowerCase();
  if (search) {
    out = out.filter((r) =>
      `${r.user.firstName} ${r.user.lastName} ${r.user.email}`.toLowerCase().includes(search)
    );
  }

  // ── Equality ──
  const eqFilters: Array<{ key: keyof InstructorPerformance; param: string }> = [
    { key: "county", param: "filter.county" },
    { key: "transmission", param: "filter.transmission" },
  ];
  for (const { key, param } of eqFilters) {
    const v = params[param];
    if (typeof v === "string" && v && v !== "all") {
      out = out.filter((r) => r[key] === v);
    }
  }

  // ── Numeric $gte ──
  const numFilters: Array<{ key: keyof InstructorPerformance; param: string }> = [
    { key: "yearsOfExperience", param: "filter.yearsOfExperience" },
    { key: "averageRating", param: "filter.rating" },
    { key: "passRate", param: "filter.passRate" },
    { key: "totalReviews", param: "filter.totalReviews" },
  ];
  for (const { key, param } of numFilters) {
    const raw = params[param];
    if (typeof raw !== "string") continue;
    const m = raw.match(/^\$gte:(.+)$/);
    if (!m) continue;
    const threshold = Number(m[1]!); // 👈 !
    out = out.filter((r) => Number(r[key]) >= threshold);
  }

  // ── Date range on lastReviewAt ──
  const dateRaw = params["filter.lastReviewAt"];
  if (typeof dateRaw === "string") {
    const btw = dateRaw.match(/^\$btw:(.+),(.+)$/);
    const gte = dateRaw.match(/^\$gte:(.+)$/);
    const lte = dateRaw.match(/^\$lte:(.+)$/);

    const ts = (r: InstructorPerformance) =>
      r.lastReviewAt ? new Date(r.lastReviewAt).getTime() : 0;

    if (btw) {
      const from = new Date(btw[1]!).getTime(); // 👈 !
      const to = new Date(btw[2]!).getTime(); // 👈 !
      out = out.filter((r) => ts(r) >= from && ts(r) <= to);
    } else if (gte) {
      const from = new Date(gte[1]!).getTime(); // 👈 !
      out = out.filter((r) => ts(r) >= from);
    } else if (lte) {
      const to = new Date(lte[1]!).getTime(); // 👈 !
      out = out.filter((r) => ts(r) <= to);
    }
  }

  return out;
}

class PerformanceService {
  async getInstructorPerformance(params: Record<string, unknown> = {}): Promise<{
    data: InstructorPerformance[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await new Promise((r) => setTimeout(r, LATENCY));

    const filtered = applyFilters(dummyPerformanceRows, params);
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

  async getKpis(): Promise<{ data: PerformanceKpis }> {
    await new Promise((r) => setTimeout(r, LATENCY / 2));
    return { data: computeKpis(dummyPerformanceRows) };
  }

  async getInstructorDetail(id: string): Promise<{ data: InstructorPerformance }> {
    await new Promise((r) => setTimeout(r, LATENCY / 2));

    const found = dummyPerformanceRows.find((r) => r.id === id);
    if (!found) {
      throw new Error(`Performance record not found: ${id}`);
    }
    return { data: found };
  }
}

export const performanceService = new PerformanceService();
