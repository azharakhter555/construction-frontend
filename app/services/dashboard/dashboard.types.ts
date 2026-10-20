// services/dashboard/dashboard.types.ts

/**
 * Dashboard statistics
 */
export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  revenueTrend: "up" | "down" | "neutral";
  totalBookings: number;
  bookingsChange: number;
  bookingsTrend: "up" | "down" | "neutral";
  weeklyBookings: number;
  activeInstructors: number;
  instructorsChange: number;
  instructorsTrend: "up" | "down" | "neutral";
  pendingInstructors: number;
  activeStudents: number;
  studentsChange: number;
  studentsTrend: "up" | "down" | "neutral";
  newStudents: number;
}

/**
 * Revenue chart data point
 */
export interface RevenueDataPoint {
  month: string;
  revenue: number;
}

/**
 * Bookings chart data point
 */
export interface BookingsDataPoint {
  day: string;
  bookings: number;
}

/**
 * User growth chart data point
 */
export interface UserGrowthDataPoint {
  month: string;
  instructors: number;
  students: number;
}

/**
 * Booking status pie chart data point
 */
export interface BookingStatusDataPoint {
  name: string;
  value: number;
  color: string;
}

/**
 * Top instructor table data
 */
export interface TopInstructor {
  id: string;
  name: string;
  avatar: string | null;
  bookings: number;
  revenue: number;
  rating: number;
}

/**
 * Dashboard filter options
 */
export interface DashboardFilter {
  from?: Date;
  to?: Date;
  instructorId?: string;
}

/**
 * Complete dashboard data
 */
export interface DashboardData {
  stats: DashboardStats;
  revenue: RevenueDataPoint[];
  bookings: BookingsDataPoint[];
  userGrowth: UserGrowthDataPoint[];
  bookingStatus: BookingStatusDataPoint[];
  topInstructors: TopInstructor[];
}
