// types/booking.types.ts

// ── Enums (mirror your backend enums) ──
export type BookingStatus =
  | "pending_assignment"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "pending"
  | "rejected"
  | "rescheduled"
  | "no_show";

export type BookingMode = "by-time" | "by-instructor" | "auto-match";

export type TransmissionType = "manual" | "automatic";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}
// ── Time slot (returned by availability endpoint) ──
export interface TimeSlot {
  id: string;
  label: string; // "09:00"
  hour: number; // 9
  availableCount: number; // how many instructors free at this time
}

// ── Instructor (subset used on booking cards) ──
export interface BookingInstructor {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  rating?: number;
  city: string;
  transmission: TransmissionType;
  hourlyRate: number;
  verified?: boolean;
}

// ── Availability query params ──
export interface AvailabilityParams {
  date: string; // YYYY-MM-DD
  slotId?: string;
  instructorId?: string;
  mode: BookingMode;
}

export interface AvailabilityResponse {
  slots: TimeSlot[];
  instructors: BookingInstructor[];
}

// ── Create booking payload ──
export interface CreateBookingPayload {
  date: string; // ISO string
  slotId: string;
  instructorId: string | null; // null = admin will assign later
  mode: BookingMode;
}

// ── Booking entity returned from API ──
export interface Booking {
  id: string;
  date: string;
  slotId: string;
  slotLabel: string;
  instructorId: string | null;
  instructorName: string | null;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}

// ── Filters for "My Bookings" list ──
export interface BookingFilters {
  status?: BookingStatus;
  from?: string; // YYYY-MM-DD
  to?: string; // YYYY-MM-DD
  page?: number;
  limit?: number;
  search?: string;
}

// src/types/booking.types.ts
export interface BookingRequest {
  id: string;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  studentAvatarUrl?: string;
  date: string; // "2026-10-06"
  start: string; // "10:00"
  end: string; // "11:00"
  status: BookingStatus;
  lessonType: string; // "Manual" | "Automatic"
  pickupLocation?: string;
  notes?: string; // student's note
  requestedAt: string; // ISO
  price?: number;
}

export type RequestFilter = "pending" | "confirmed" | "all";
