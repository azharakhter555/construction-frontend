"use client";

import { useEffect, useState, useCallback } from "react";
import { dummyInstructors, dummySlots } from "@/lib/dummy-data/bookings.data";
import type { BookingInstructor, BookingMode, TimeSlot } from "@/types/booking.types";

export function useAvailability(params: {
  date: Date;
  slotId?: string;
  instructorId?: string;
  mode: BookingMode;
}) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [instructors, setInstructors] = useState<BookingInstructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // simulate network latency
    await new Promise((r) => setTimeout(r, 300));
    setSlots(dummySlots);
    setInstructors(dummyInstructors);
    setIsLoading(false);
  }, [params.date, params.slotId, params.instructorId, params.mode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { slots, instructors, isLoading, error, refresh: fetchData };
}
