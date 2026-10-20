// src/types/availability.types.ts
export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface TimeRange {
  start: string; // "09:00"
  end: string; // "17:00"
}

export interface DayAvailability {
  day: DayKey;
  enabled: boolean;
  ranges: TimeRange[];
}

export interface WeeklyAvailability {
  weekStart: string; // ISO date "2026-10-05"
  days: DayAvailability[];
}

export interface InstructorBooking {
  id: string;
  studentName: string;
  studentPhone?: string;
  date: string; // "2026-10-06"
  start: string; // "10:00"
  end: string; // "11:00"
  status: "confirmed" | "pending" | "completed" | "cancelled";
  lessonType?: string; // "Manual", "Automatic"
  pickupLocation?: string;
}

export const DAYS: { key: DayKey; label: string; short: string }[] = [
  { key: "mon", label: "Monday", short: "Mon" },
  { key: "tue", label: "Tuesday", short: "Tue" },
  { key: "wed", label: "Wednesday", short: "Wed" },
  { key: "thu", label: "Thursday", short: "Thu" },
  { key: "fri", label: "Friday", short: "Fri" },
  { key: "sat", label: "Saturday", short: "Sat" },
  { key: "sun", label: "Sunday", short: "Sun" },
];

// Default working hours for a new week
export const DEFAULT_WEEK: WeeklyAvailability = {
  weekStart: "",
  days: DAYS.map((d) => ({
    day: d.key,
    enabled: ["mon", "tue", "wed", "thu", "fri"].includes(d.key),
    ranges: [{ start: "09:00", end: "17:00" }],
  })),
};
