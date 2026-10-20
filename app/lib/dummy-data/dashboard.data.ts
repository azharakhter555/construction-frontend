// lib/dummy-data/dashboard.data.ts

import type {
  DashboardStats,
  RevenueDataPoint,
  BookingsDataPoint,
  UserGrowthDataPoint,
  BookingStatusDataPoint,
  TopInstructor,
} from "@/types/types";

export const dummyDashboardStats: DashboardStats = {
  totalRevenue: 45231.89,
  revenueChange: 20.1,
  revenueTrend: "up",
  totalBookings: 1234,
  bookingsChange: 15.3,
  bookingsTrend: "up",
  weeklyBookings: 342,
  activeInstructors: 48,
  instructorsChange: 12.5,
  instructorsTrend: "up",
  pendingInstructors: 8,
  activeStudents: 892,
  studentsChange: 18.2,
  studentsTrend: "up",
  newStudents: 124,
};

export const dummyRevenueData: RevenueDataPoint[] = [
  { month: "Jan", revenue: 4500 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 6100 },
  { month: "Apr", revenue: 5800 },
  { month: "May", revenue: 7200 },
  { month: "Jun", revenue: 8100 },
  { month: "Jul", revenue: 9500 },
  { month: "Aug", revenue: 10200 },
  { month: "Sep", revenue: 11500 },
  { month: "Oct", revenue: 12800 },
  { month: "Nov", revenue: 14200 },
  { month: "Dec", revenue: 16800 },
];

export const dummyBookingsData: BookingsDataPoint[] = [
  { day: "Mon", bookings: 24 },
  { day: "Tue", bookings: 32 },
  { day: "Wed", bookings: 28 },
  { day: "Thu", bookings: 45 },
  { day: "Fri", bookings: 52 },
  { day: "Sat", bookings: 68 },
  { day: "Sun", bookings: 42 },
];

export const dummyUserGrowthData: UserGrowthDataPoint[] = [
  { month: "Jan", instructors: 32, students: 450 },
  { month: "Feb", instructors: 35, students: 520 },
  { month: "Mar", instructors: 38, students: 580 },
  { month: "Apr", instructors: 40, students: 620 },
  { month: "May", instructors: 42, students: 710 },
  { month: "Jun", instructors: 45, students: 780 },
  { month: "Jul", instructors: 46, students: 820 },
  { month: "Aug", instructors: 48, students: 892 },
];

export const dummyBookingStatusData: BookingStatusDataPoint[] = [
  { name: "Completed", value: 856, color: "#10b981" },
  { name: "Upcoming", value: 234, color: "#3b82f6" },
  { name: "Cancelled", value: 98, color: "#ef4444" },
  { name: "No-Show", value: 46, color: "#f59e0b" },
];

export const dummyTopInstructors: TopInstructor[] = [
  { id: "1", name: "John Murphy", avatar: null, bookings: 156, revenue: 8580, rating: 4.9 },
  { id: "2", name: "Sarah O'Brien", avatar: null, bookings: 142, revenue: 7810, rating: 4.8 },
  { id: "3", name: "Michael Ryan", avatar: null, bookings: 128, revenue: 7040, rating: 4.7 },
  { id: "4", name: "Emma Walsh", avatar: null, bookings: 115, revenue: 6325, rating: 4.9 },
  { id: "5", name: "David Kelly", avatar: null, bookings: 98, revenue: 5390, rating: 4.6 },
];
