// services/booking/booking.service.ts

import { httpClient } from "../http/client";
import { buildQueryString } from "@/lib/query-utils";
import type {
  AvailabilityParams,
  AvailabilityResponse,
  Booking,
  BookingFilters,
  CreateBookingPayload,
  PaginatedResponse,
} from "@/types/booking.types";

class BookingService {
  /**
   * Get available slots + instructors for a given date.
   * Used by the student booking page.
   *
   * GET /bookings/availability?date=2026-05-14&slotId=&instructorId=&mode=by-time
   */
  async getAvailability(params: AvailabilityParams): Promise<AvailabilityResponse> {
    const url = `/bookings/availability${buildQueryString(params)}`;
    const response = await httpClient.request<AvailabilityResponse>(url, {
      method: "GET",
    });

    // Safety: backend sometimes returns data wrapped — normalize it
    const raw: any = response.data;
    return {
      slots: raw?.slots ?? [],
      instructors: (raw?.instructors ?? []).map((item: any) => ({
        ...item,
        // flatten user fields if backend nests them (same pattern as drivers)
        firstName: item.user?.firstName ?? item.firstName ?? "",
        lastName: item.user?.lastName ?? item.lastName ?? "",
      })),
    };
  }

  /**
   * Create a booking. `instructorId` can be null — admin assigns later.
   *
   * POST /bookings
   */
  async createBooking(payload: CreateBookingPayload): Promise<Booking> {
    const response = await httpClient.request<Booking>("/bookings", {
      method: "POST",
      body: payload,
    });
    return response.data;
  }

  /**
   * Get the logged-in student's bookings (paginated).
   *
   * GET /bookings/me?page=1&limit=10&status=confirmed
   */
  async getMyBookings(params: BookingFilters = {}): Promise<PaginatedResponse<Booking>> {
    const url = `/bookings/me${buildQueryString(params)}`;
    const response = await httpClient.request<PaginatedResponse<any>>(url, {
      method: "GET",
    });

    // Flatten instructor name if nested
    const flattened = response.data.data.map((item: any) => ({
      ...item,
      instructorName:
        item.instructorName ??
        (item.instructor
          ? `${item.instructor.firstName} ${item.instructor.lastName}`.trim()
          : null),
    }));

    return {
      ...response.data,
      data: flattened,
    };
  }

  /**
   * Get a single booking by ID (for the detail / confirm page).
   *
   * GET /bookings/:id
   */
  async getBookingById(id: string): Promise<Booking> {
    const response = await httpClient.request<Booking>(`/bookings/${id}`, {
      method: "GET",
    });
    return response.data;
  }

  /**
   * Cancel a booking (student action).
   *
   * PATCH /bookings/:id/cancel
   */
  async cancelBooking(id: string): Promise<Booking> {
    const response = await httpClient.request<Booking>(`/bookings/${id}/cancel`, {
      method: "PATCH",
    });
    return response.data;
  }

  /**
   * Reschedule a booking (optional — student picks new slot).
   *
   * PATCH /bookings/:id/reschedule
   */
  async rescheduleBooking(id: string, payload: { date: string; slotId: string }): Promise<Booking> {
    const response = await httpClient.request<Booking>(`/bookings/${id}/reschedule`, {
      method: "PATCH",
      body: payload,
    });
    return response.data;
  }
}

export const bookingService = new BookingService();
