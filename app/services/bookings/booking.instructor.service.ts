// src/services/bookings/bookings.service.ts
import type { BookingRequest } from "@/types/booking.types";

const BASE = process.env["NEXT_PUBLIC_API_URL"] ?? "/api";
const USE_DUMMY = true;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 🚧 DUMMY: deterministic per week
function buildDummyRequests(weekStartISO: string): BookingRequest[] {
  const weekStart = new Date(weekStartISO + "T00:00:00");
  const dayISO = (offset: number) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + offset);
    return d.toISOString().slice(0, 10);
  };

  const notes = [
    "First lesson ever — a bit nervous!",
    "Need to focus on parallel parking.",
    "Test next month, want to be ready.",
    "Prefer quiet roads to start.",
    "Been driving 20 years, just need a refresher.",
  ];

  return [
    // Monday
    {
      id: "r1",
      studentName: "Aoife Murphy",
      studentPhone: "087 123 4567",
      studentEmail: "aoife@example.com",
      date: dayISO(0),
      start: "09:00",
      end: "10:00",
      status: "pending",
      lessonType: "Manual",
      pickupLocation: "Sycamore St, Dublin 1",
      notes: notes[0],
      requestedAt: new Date().toISOString(),
      price: 50,
    },
    {
      id: "r2",
      studentName: "Cian O'Brien",
      studentPhone: "086 234 5678",
      studentEmail: "cian@example.com",
      date: dayISO(0),
      start: "14:00",
      end: "15:00",
      status: "confirmed",
      lessonType: "Automatic",
      pickupLocation: "Rathmines, Dublin 6",
      notes: notes[1],
      requestedAt: new Date().toISOString(),
      price: 55,
    },

    // Tuesday
    {
      id: "r3",
      studentName: "Saoirse Kelly",
      studentPhone: "085 345 6789",
      studentEmail: "saoirse@example.com",
      date: dayISO(1),
      start: "11:00",
      end: "12:00",
      status: "pending",
      lessonType: "Manual",
      pickupLocation: "Swords, Co. Dublin",
      notes: notes[2],
      requestedAt: new Date().toISOString(),
      price: 50,
    },
    {
      id: "r4",
      studentName: "Darragh Walsh",
      studentPhone: "083 456 7890",
      studentEmail: "darragh@example.com",
      date: dayISO(1),
      start: "15:00",
      end: "16:00",
      status: "pending",
      lessonType: "Manual",
      pickupLocation: "Tallaght, Dublin 24",
      notes: notes[3],
      requestedAt: new Date().toISOString(),
      price: 50,
    },
    {
      id: "r5",
      studentName: "Niamh Byrne",
      studentPhone: "089 567 8901",
      studentEmail: "niamh@example.com",
      date: dayISO(1),
      start: "18:00",
      end: "19:00",
      status: "confirmed",
      lessonType: "Automatic",
      pickupLocation: "Blackrock, Co. Dublin",
      notes: notes[4],
      requestedAt: new Date().toISOString(),
      price: 55,
    },

    // Wednesday
    {
      id: "r6",
      studentName: "Liam Doyle",
      studentPhone: "087 678 9012",
      studentEmail: "liam@example.com",
      date: dayISO(2),
      start: "10:00",
      end: "11:00",
      status: "pending",
      lessonType: "Manual",
      pickupLocation: "Blanchardstown, Dublin 15",
      notes: notes[0],
      requestedAt: new Date().toISOString(),
      price: 50,
    },
    {
      id: "r7",
      studentName: "Róisín Kennedy",
      studentPhone: "086 789 0123",
      studentEmail: "roisin@example.com",
      date: dayISO(2),
      start: "13:00",
      end: "14:00",
      status: "cancelled",
      lessonType: "Manual",
      pickupLocation: "Sycamore St, Dublin 1",
      notes: notes[1],
      requestedAt: new Date().toISOString(),
      price: 50,
    },

    // Thursday
    {
      id: "r8",
      studentName: "Oisín Ryan",
      studentPhone: "085 890 1234",
      studentEmail: "oisin@example.com",
      date: dayISO(3),
      start: "09:00",
      end: "10:00",
      status: "pending",
      lessonType: "Automatic",
      pickupLocation: "Rathmines, Dublin 6",
      notes: notes[2],
      requestedAt: new Date().toISOString(),
      price: 55,
    },
    {
      id: "r9",
      studentName: "Ciara Lynch",
      studentPhone: "083 901 2345",
      studentEmail: "ciara@example.com",
      date: dayISO(3),
      start: "16:00",
      end: "17:00",
      status: "confirmed",
      lessonType: "Manual",
      pickupLocation: "Swords, Co. Dublin",
      notes: notes[3],
      requestedAt: new Date().toISOString(),
      price: 50,
    },

    // Friday
    {
      id: "r10",
      studentName: "Fionn Gallagher",
      studentPhone: "089 012 3456",
      studentEmail: "fionn@example.com",
      date: dayISO(4),
      start: "11:00",
      end: "12:00",
      status: "pending",
      lessonType: "Manual",
      pickupLocation: "Tallaght, Dublin 24",
      notes: notes[4],
      requestedAt: new Date().toISOString(),
      price: 50,
    },
    {
      id: "r11",
      studentName: "Aoife Murphy",
      studentPhone: "087 123 4567",
      studentEmail: "aoife@example.com",
      date: dayISO(4),
      start: "17:00",
      end: "18:00",
      status: "pending",
      lessonType: "Manual",
      pickupLocation: "Sycamore St, Dublin 1",
      notes: notes[0],
      requestedAt: new Date().toISOString(),
      price: 50,
    },

    // Saturday
    {
      id: "r12",
      studentName: "Cian O'Brien",
      studentPhone: "086 234 5678",
      studentEmail: "cian@example.com",
      date: dayISO(5),
      start: "10:00",
      end: "11:00",
      status: "confirmed",
      lessonType: "Automatic",
      pickupLocation: "Rathmines, Dublin 6",
      notes: notes[1],
      requestedAt: new Date().toISOString(),
      price: 55,
    },
  ];
}

export const bookingsService = {
  async getRequests(weekStart: string): Promise<BookingRequest[]> {
    if (USE_DUMMY) {
      await delay(350);
      return buildDummyRequests(weekStart);
    }
    const res = await fetch(`${BASE}/instructor/bookings/requests?weekStart=${weekStart}`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to load requests");
    return res.json();
  },

  async confirm(id: string): Promise<void> {
    if (USE_DUMMY) {
      await delay(300);
      return;
    }
    const res = await fetch(`${BASE}/instructor/bookings/requests/${id}/confirm`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to confirm");
  },

  async cancel(id: string, reason?: string): Promise<void> {
    if (USE_DUMMY) {
      await delay(300);
      return;
    }
    const res = await fetch(`${BASE}/instructor/bookings/requests/${id}/cancel`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });
    if (!res.ok) throw new Error("Failed to cancel");
  },

  async reschedule(id: string, date: string, start: string, end: string): Promise<void> {
    if (USE_DUMMY) {
      await delay(300);
      return;
    }
    const res = await fetch(`${BASE}/instructor/bookings/requests/${id}/reschedule`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, start, end }),
    });
    if (!res.ok) throw new Error("Failed to reschedule");
  },
};
