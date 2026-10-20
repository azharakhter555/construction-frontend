// lib/filter-utils.ts
import type { DateRangeValue, FilterConfig, FilterState, FilterValue } from "@/types/filter";
import { isDateRangeValue, isNumberRangeValue } from "@/types/filter";

/**
 * nestjs-paginate version gate.
 *   v6 → ?filter.<name>=...
 *   v7 → ?<name>=...
 * Flip this ONE constant when you upgrade.
 */
const API_FILTER_PREFIX = "filter.";

/** FilterOperator → URL prefix. */
const OPERATOR_PREFIXES: Record<string, string> = {
  eq: "$eq",
  ne: "$ne",
  gt: "$gt",
  gte: "$gte",
  lt: "$lt",
  lte: "$lte",
  btw: "$btw",
  in: "$in",
  contains: "$cont",
};

/** Params that stay BARE even in v6. */
const RESERVED_KEYS = new Set(["search", "sortBy", "page", "limit"]);

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function isBlank(v: FilterValue): boolean {
  return (
    v === undefined ||
    v === null ||
    (typeof v === "string" && v.trim() === "") ||
    (Array.isArray(v) && v.length === 0)
  );
}

function isDefault(v: FilterValue, def: FilterValue | undefined): boolean {
  if (def === undefined) return false;
  if (Array.isArray(v) && Array.isArray(def)) {
    return v.length === def.length && v.every((x, i) => x === def[i]);
  }
  return v === def;
}

/** Date-only string like "2026-09-17" (no time component). */
const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Convert any date-ish value to ISO-8601.
 * Used for the "from" bound — start of day (00:00:00.000Z) for date-only inputs.
 */
function toIso(v: string | Date | number): string {
  return (v instanceof Date ? v : new Date(v)).toISOString();
}

/**
 * Convert any date-ish value to ISO-8601, but push date-only inputs to
 * the END of that day (23:59:59.999Z).
 *
 * Why: an HTML <input type="date"> returns "2026-09-17", which JS parses
 * as midnight UTC. Users mean "through the end of Sept 17" — so we shift
 * it. Without this, a record at 01:48Z on Sept 17 falls outside a filter
 * ending "2026-09-17".
 */
function toEndOfDayIso(v: string | Date | number): string {
  const d = v instanceof Date ? new Date(v) : new Date(v);
  if (typeof v === "string" && DATE_ONLY_RE.test(v)) {
    d.setUTCHours(23, 59, 59, 999);
  }
  return d.toISOString();
}

function resolveKey(id: string): string {
  return RESERVED_KEYS.has(id) ? id : `${API_FILTER_PREFIX}${id}`;
}

// ─────────────────────────────────────────────────────────────
// Builder
// ─────────────────────────────────────────────────────────────

export interface BuildOptions {
  /** Non-filter params (page, limit, sortBy, etc.). */
  extra?: Record<string, string | number | boolean>;
}

export function buildQueryParams(
  configs: readonly FilterConfig[],
  values: FilterState,
  options: BuildOptions = {}
): Record<string, string | string[]> {
  const { extra = {} } = options;
  const result: Record<string, string | string[]> = {};

  // 1. Reserved params first
  for (const [k, v] of Object.entries(extra)) {
    if (v === undefined || v === null) continue;
    result[k] = String(v);
  }

  // 2. Iterate configs in declared order → deterministic URL
  for (const config of configs) {
    const value = values[config.id];
    if (isBlank(value)) continue;
    if (isDefault(value, config.defaultValue)) continue;

    const key = resolveKey(config.id);

    // ── date-range → $btw:from,to ──
    if (config.type === "date-range") {
      if (!isDateRangeValue(value)) continue;

      const parts: string[] = [];
      // "from" → start of day (00:00:00.000Z)
      if (value.from) parts.push(toIso(value.from));
      // "to"   → END of day (23:59:59.999Z) for date-only inputs
      if (value.to) parts.push(toEndOfDayIso(value.to));

      if (parts.length === 2) {
        result[key] = `$btw:${parts[0]},${parts[1]}`;
      } else if (value.from) {
        result[key] = `$gte:${parts[0]}`;
      } else if (value.to) {
        result[key] = `$lte:${parts[0]}`;
      }
      continue;
    }

    // ── number-range → $btw:min,max or $gte/$lte ──
    if (config.type === "number-range") {
      if (!isNumberRangeValue(value)) continue;

      if (value.min != null && value.max != null) {
        result[key] = `$btw:${value.min},${value.max}`;
      } else if (value.min != null) {
        result[key] = `$gte:${value.min}`;
      } else if (value.max != null) {
        result[key] = `$lte:${value.max}`;
      }
      continue;
    }

    // ── multi-select / $in ──
    if ((config.multiple || config.type === "multi-select") && Array.isArray(value)) {
      result[key] = `$in:${value.join(",")}`;
      continue;
    }

    // ── operator-prefixed scalar (gte, lte, …) ──
    if (config.operator) {
      const op = OPERATOR_PREFIXES[config.operator];
      if (!op) {
        result[key] = String(value);
        continue;
      }
      if (Array.isArray(value)) {
        result[key] = `${op}:${value.join(",")}`;
      } else {
        result[key] = `${op}:${String(value)}`;
      }
      continue;
    }

    // ── boolean → "true" / "false" ──
    if (typeof value === "boolean") {
      result[key] = value ? "true" : "false";
      continue;
    }

    // ── string / number → bare ──
    if (typeof value === "string" || typeof value === "number") {
      result[key] = String(value);
      continue;
    }
  }

  return result;
}

// ─────────────────────────────────────────────────────────────
// Serializer
// ─────────────────────────────────────────────────────────────

export function toQueryString(
  params: Record<string, string | string[] | undefined | null>
): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    if (Array.isArray(v)) {
      for (const item of v) sp.append(k, String(item));
    } else {
      sp.append(k, String(v));
    }
  }
  return sp.toString();
}
