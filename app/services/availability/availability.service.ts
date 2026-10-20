// src/services/availability/availability.service.ts
import type {
  WeeklyAvailability,
  InstructorBooking,
  DayAvailability,
  DayKey,
} from "@/types/availability.types";
import { DAYS } from "@/types/availability.types";

const BASE = process.env["NEXT_PUBLIC_API_URL"] ?? "/api";

// ──────────────────────────────────────────────────────────────────
// 🚧 DUMMY DATA — remove when backend is ready
// ──────────────────────────────────────────────────────────────────

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day - 1 + 7) % 7; // Monday = 0
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Builds a believable week of bookings for the given weekStart.
 * Deterministic per week (same week = same data), so navigation is stable.
 */
function buildDummyBookings(weekStartISO: string): InstructorBooking[] {
  const weekStart = new Date(weekStartISO + "T00:00:00");
  const seed = weekStart.getTime() / (1000 * 60 * 60 * 24);

  const students = [
    { name: "Aoife Murphy", phone: "087 123 4567", type: "Manual" },
    { name: "Cian O'Brien", phone: "086 234 5678", type: "Automatic" },
    { name: "Saoirse Kelly", phone: "085 345 6789", type: "Manual" },
    { name: "Darragh Walsh", phone: "083 456 7890", type: "Manual" },
    { name: "Niamh Byrne", phone: "089 567 8901", type: "Automatic" },
    { name: "Liam Doyle", phone: "087 678 9012", type: "Manual" },
    { name: "Róisín Kennedy", phone: "086 789 0123", type: "Manual" },
    { name: "Oisín Ryan", phone: "085 890 1234", type: "Automatic" },
    { name: "Ciara Lynch", phone: "083 901 2345", type: "Manual" },
    { name: "Fionn Gallagher", phone: "089 012 3456", type: "Manual" },
  ];

  const slots: Array<{ start: string; end: string }> = [
    { start: "09:00", end: "10:00" },
    { start: "10:00", end: "11:00" },
    { start: "11:00", end: "12:00" },
    { start: "13:00", end: "14:00" },
    { start: "14:00", end: "15:00" },
    { start: "15:00", end: "16:00" },
    { start: "16:00", end: "17:00" },
    { start: "18:00", end: "19:00" },
  ];

  const statuses: InstructorBooking["status"][] = [
    "confirmed",
    "confirmed",
    "confirmed",
    "pending",
    "completed",
  ];

  const bookings: InstructorBooking[] = [];
  const locations = [
    "Sycamore St, Dublin 1",
    "Rathmines, Dublin 6",
    "Swords, Co. Dublin",
    "Tallaght, Dublin 24",
    "Blackrock, Co. Dublin",
    "Blanchardstown, Dublin 15",
  ];

  // Populate 3–6 bookings per day, skip Sunday
  for (let dayIdx = 0; dayIdx < 6; dayIdx++) {
    const day = addDays(weekStart, dayIdx);
    const dayISO = toISODate(day);

    // Deterministic count: 3–6 bookings
    const count = 3 + ((seed + dayIdx) % 4);

    // Pick non-overlapping slot indices deterministically
    const usedIndices = new Set<number>();
    for (let i = 0; i < count; i++) {
      const idx = (seed + dayIdx * 3 + i * 2) % slots.length;
      if (usedIndices.has(idx)) continue;
      usedIndices.add(idx);

      const slot = slots[idx];
      if (!slot) continue;

      const student = students[(seed + dayIdx + i) % students.length];
      if (!student) continue;

      bookings.push({
        id: `b-${dayISO}-${idx}`,
        studentName: student.name,
        studentPhone: student.phone,
        date: dayISO,
        start: slot.start,
        end: slot.end,
        status: statuses[(seed + i) % statuses.length] ?? "confirmed",
        lessonType: student.type,
        pickupLocation: locations[(seed + dayIdx + i) % locations.length],
      });
    }
  }

  return bookings.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.start.localeCompare(b.start);
  });
}

/**
 * Builds a default week of availability: Mon–Fri 9–5, Sat 9–1, Sunday off.
 */
function buildDummyWeek(weekStartISO: string): WeeklyAvailability {
  const days: DayAvailability[] = DAYS.map((d) => {
    switch (d.key) {
      case "sat":
        return {
          day: d.key,
          enabled: true,
          ranges: [{ start: "09:00", end: "13:00" }],
        };
      case "sun":
        return {
          day: d.key,
          enabled: false,
          ranges: [{ start: "09:00", end: "17:00" }],
        };
      default:
        return {
          day: d.key,
          enabled: true,
          ranges: [{ start: "09:00", end: "17:00" }],
        };
    }
  });

  return { weekStart: weekStartISO, days };
}

// Simulate network latency so loading states are visible
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ──────────────────────────────────────────────────────────────────
// Service
// ──────────────────────────────────────────────────────────────────

// 🔧 Flip to `false` (or delete) when the real API is wired up.
const USE_DUMMY = true;

export const availabilityService = {
  async getWeek(weekStart: string): Promise<WeeklyAvailability> {
    if (USE_DUMMY) {
      await delay(400);
      // Persist whatever the user last saved (in-memory only)
      const cached = dummyStore.weeks.get(weekStart);
      if (cached) return structuredClone(cached);

      const seeded = buildDummyWeek(weekStart);
      dummyStore.weeks.set(weekStart, structuredClone(seeded));
      return seeded;
    }

    const res = await fetch(`${BASE}/instructor/availability?weekStart=${weekStart}`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to load availability");
    return res.json();
  },

  async saveWeek(payload: WeeklyAvailability): Promise<WeeklyAvailability> {
    if (USE_DUMMY) {
      await delay(500);
      dummyStore.weeks.set(payload.weekStart, structuredClone(payload));
      return structuredClone(payload);
    }

    const res = await fetch(`${BASE}/instructor/availability`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to save availability");
    return res.json();
  },

  async getBookings(weekStart: string): Promise<InstructorBooking[]> {
    if (USE_DUMMY) {
      await delay(400);
      return buildDummyBookings(weekStart);
    }

    const res = await fetch(`${BASE}/instructor/bookings?weekStart=${weekStart}`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to load bookings");
    return res.json();
  },
};

// ──────────────────────────────────────────────────────────────────
// In-memory store for dummy mode (survives route navigation, dies on refresh)
// ──────────────────────────────────────────────────────────────────
const dummyStore = {
  weeks: new Map<string, WeeklyAvailability>(),
};
