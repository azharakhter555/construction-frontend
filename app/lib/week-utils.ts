// src/lib/week-utils.ts
import type { DayKey } from "@/types/availability.types";

export function startOfWeek(date: Date, weekStartsOn: 0 | 1 = 1): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun, 1 = Mon, ...
  const diff = (day - weekStartsOn + 7) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export const DAY_INDEX: Record<DayKey, number> = {
  mon: 0,
  tue: 1,
  wed: 2,
  thu: 3,
  fri: 4,
  sat: 5,
  sun: 6,
};

export function formatWeekLabel(weekStart: Date): string {
  const end = addDays(weekStart, 6);
  const sameMonth = weekStart.getMonth() === end.getMonth();
  const monthFmt = new Intl.DateTimeFormat("en-IE", { month: "long" });
  const dayFmt = new Intl.DateTimeFormat("en-IE", { day: "numeric" });
  return sameMonth
    ? `${dayFmt.format(weekStart)} – ${dayFmt.format(end)} ${monthFmt.format(end)}`
    : `${dayFmt.format(weekStart)} ${monthFmt.format(weekStart)} – ${dayFmt.format(end)} ${monthFmt.format(end)}`;
}

export function timeToMinutes(t: string): number {
  const [h = 0, m = 0] = t.split(":").map(Number);
  return h * 60 + m;
}
export function minutesToTime(m: number): string {
  const h = Math.floor(m / 60)
    .toString()
    .padStart(2, "0");
  const mm = (m % 60).toString().padStart(2, "0");
  return `${h}:${mm}`;
}
