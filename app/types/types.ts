// components/shared/inputs/types.ts
import type { ReactNode } from "react";

export interface BaseInputProps<T = unknown> {
  value: T;
  onChange: (value: T) => void;
  name?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  id?: string;
}

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  count?: number;
}

export interface OptionWithCount extends Option {
  count?: number;
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface NumberRange {
  min?: number;
  max?: number;
}

export type InputType =
  | "text"
  | "email"
  | "password"
  | "textarea"
  | "select"
  | "multi-select"
  | "checkbox"
  | "radio"
  | "switch"
  | "date"
  | "date-range"
  | "time"
  | "datetime"
  | "number"
  | "number-range"
  | "slider"
  | "rating"
  | "color"
  | "file"
  | "image";

export type UserTableType = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User" | "Editor";
  status: "Active" | "Inactive" | "Pending";
  lastActive: string;
  rating?: number;
  verified?: boolean;
};

// dahboard
// types/api.types.ts

// Dashboard specific types
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

export interface RevenueDataPoint {
  month: string;
  revenue: number;
}

export interface BookingsDataPoint {
  day: string;
  bookings: number;
}

export interface UserGrowthDataPoint {
  month: string;
  instructors: number;
  students: number;
}

export interface BookingStatusDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface TopInstructor {
  id: string;
  name: string;
  avatar: string | null;
  bookings: number;
  revenue: number;
  rating: number;
}
