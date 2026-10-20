import type {
  AvailabilityResponse,
  Booking,
  BookingInstructor,
  TimeSlot,
} from "@/types/booking.types";

export const dummySlots: TimeSlot[] = [
  { id: "s-08", label: "08:00", hour: 8, availableCount: 2 },
  { id: "s-09", label: "09:00", hour: 9, availableCount: 4 },
  { id: "s-10", label: "10:00", hour: 10, availableCount: 3 },
  { id: "s-11", label: "11:00", hour: 11, availableCount: 1 },
  { id: "s-13", label: "13:00", hour: 13, availableCount: 2 },
  { id: "s-14", label: "14:00", hour: 14, availableCount: 3 },
  { id: "s-15", label: "15:00", hour: 15, availableCount: 2 },
  { id: "s-16", label: "16:00", hour: 16, availableCount: 1 },
  { id: "s-17", label: "17:00", hour: 17, availableCount: 2 },
  { id: "s-18", label: "18:00", hour: 18, availableCount: 3 },
  { id: "s-19", label: "19:00", hour: 19, availableCount: 1 },
];

export const dummyInstructors: BookingInstructor[] = [
  {
    id: "ins-1",
    firstName: "John",
    lastName: "Murphy",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    rating: 4.9,
    city: "Dublin",
    transmission: "manual",
    hourlyRate: 45,
    verified: true,
  },
  {
    id: "ins-2",
    firstName: "Aoife",
    lastName: "Kelly",
    avatarUrl: "https://i.pravatar.cc/150?img=45",
    rating: 4.8,
    city: "Dublin",
    transmission: "automatic",
    hourlyRate: 50,
    verified: true,
  },
  {
    id: "ins-3",
    firstName: "Sean",
    lastName: "O'Brien",
    avatarUrl: "https://i.pravatar.cc/150?img=33",
    rating: 4.7,
    city: "Cork",
    transmission: "manual",
    hourlyRate: 42,
    verified: false,
  },
  {
    id: "ins-4",
    firstName: "Niamh",
    lastName: "Walsh",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    rating: 5.0,
    city: "Galway",
    transmission: "automatic",
    hourlyRate: 55,
    verified: true,
  },
];

export const dummyAvailability: AvailabilityResponse = {
  slots: dummySlots,
  instructors: dummyInstructors,
};

export const dummyBookings: Booking[] = [
  {
    id: "bk-1",
    date: new Date(Date.now() + 2 * 86400000).toISOString(),
    slotId: "s-10",
    slotLabel: "10:00",
    instructorId: "ins-1",
    instructorName: "John Murphy",
    status: "confirmed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "bk-2",
    date: new Date(Date.now() + 5 * 86400000).toISOString(),
    slotId: "s-15",
    slotLabel: "15:00",
    instructorId: null,
    instructorName: null,
    status: "pending_assignment",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
