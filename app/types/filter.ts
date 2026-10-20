// types/filter.ts

// ─────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────

export type FilterWidth = "full" | "half" | "third" | "quarter";

export type FilterType =
  | "text"
  | "search"
  | "select"
  | "multi-select"
  | "radio"
  | "boolean"
  | "number"
  | "number-range" // 👈 NEW — paired with NumberRangeValue below
  | "rating"
  | "date"
  | "date-range";

export type FilterOperator = "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "btw" | "in" | "contains";

export type LogicalOperator = "and" | "or";

// ─────────────────────────────────────────────────────────────
// Values
// ─────────────────────────────────────────────────────────────

export interface FilterOption<V = string> {
  label: string;
  value: V;
  disabled?: boolean;
}

export interface DateRangeValue {
  from?: Date | string | null;
  to?: Date | string | null;
}

/** 👇 NEW — for `number-range` filters (min/max inputs). */
export interface NumberRangeValue {
  min?: number | null;
  max?: number | null;
}

/** Every value a filter can hold. Union drives safe narrowing in the builder. */
export type FilterValue =
  | string
  | number
  | boolean
  | Date
  | string[]
  | number[]
  | DateRangeValue
  | NumberRangeValue // 👈 NEW
  | null
  | undefined;

export type FilterState = Record<string, FilterValue>;

// ─────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────

export interface FilterValidation {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: FilterValue) => true | string;
}

// ─────────────────────────────────────────────────────────────
// Single filter config
// ─────────────────────────────────────────────────────────────

export interface FilterConfig {
  id: string;
  label: string;
  type: FilterType;

  placeholder?: string;
  options?: FilterOption[];
  defaultValue?: FilterValue;

  disabled?: boolean;
  hidden?: boolean;

  validation?: FilterValidation;
  dependencies?: string[];

  min?: number;
  max?: number;
  step?: number;

  condition?: (values: FilterState) => boolean;
  props?: Record<string, unknown>;

  section?: string;
  order?: number;
  width?: FilterWidth;

  operator?: FilterOperator;
  multiple?: boolean;
}

// ─────────────────────────────────────────────────────────────
// Filter groups
// ─────────────────────────────────────────────────────────────

export interface FilterGroupConfig {
  id: string;
  label?: string;
  filters: string[];
  operator?: LogicalOperator;
  condition?: (values: FilterState) => boolean;
}

export type GroupedFilters = Record<string, FilterConfig[]>;

// ─────────────────────────────────────────────────────────────
// 👇 NEW — Type guards
//
// Every guard narrows `unknown` (or the `FilterValue` union) to a
// concrete shape. Use these instead of `in` / `.from` / `.min` on
// the raw union — TS can't verify those and you'll get the
// `((Date | DateRangeValue) & Record<"min", unknown>)` errors.
// ─────────────────────────────────────────────────────────────

/** Plain object (not null, array, or Date). */
export function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v) && !(v instanceof Date);
}

/** `{ from, to }` — a date range. */
export function isDateRangeValue(v: unknown): v is DateRangeValue {
  if (!isPlainObject(v)) return false;
  return "from" in v || "to" in v;
}

/** `{ min, max }` — a number range. */
export function isNumberRangeValue(v: unknown): v is NumberRangeValue {
  if (!isPlainObject(v)) return false;
  return "min" in v || "max" in v;
}

/** Finite number (rules out NaN and Infinity). */
export function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

/** Non-empty, non-whitespace string. */
export function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim() !== "";
}

/**
 * Filter is "on" — the value differs from what the config considers default.
 * Centralizes the skip-logic that was duplicated in useFilters + the builder.
 */
export function isFilterValueActive(
  value: FilterValue,
  config: Pick<FilterConfig, "type" | "defaultValue" | "operator">
): boolean {
  if (value === undefined || value === null || value === "") return false;

  // Explicit default match
  if (config.defaultValue !== undefined && value === config.defaultValue) {
    return false;
  }

  // Select / radio: "all" is a sentinel for "off"
  if ((config.type === "select" || config.type === "radio") && value === "all") {
    return false;
  }

  // Number / rating: 0 is "off"
  if (
    (config.type === "number" || config.type === "rating") &&
    isFiniteNumber(value) &&
    value === 0
  ) {
    return false;
  }

  // Arrays: empty = off
  if (Array.isArray(value)) return value.length > 0;

  // Date ranges: need at least one bound
  if (config.type === "date-range" || isDateRangeValue(value)) {
    if (!isDateRangeValue(value)) return false;
    return Boolean(value.from || value.to);
  }

  // Number ranges: need at least one bound
  if (config.type === "number-range" || isNumberRangeValue(value)) {
    if (!isNumberRangeValue(value)) return false;
    return value.min != null || value.max != null;
  }

  return true;
}
