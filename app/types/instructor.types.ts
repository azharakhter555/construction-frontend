// types/instructor.types.ts

/**
 * Base Instructor type - matches your database schema
 */
export interface Instructor {
  status: string | undefined;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string; // Ireland-specific: Dublin, Cork, Galway, etc.
  eircode: string; // Ireland postal code
  dateOfBirth: string;
  drivingLicenseNumber: string;
  licenseExpiryDate: string;
  adiNumber: string; // Approved Driving Instructor (RSA Ireland)
  adiExpiryDate: string;
  transmission: "manual" | "automatic" | "both";
  hourlyRate: number;
  yearsOfExperience: number;
  bio: string;
  profileImage: string | null;
  idDocumentUrl: string | null;
  adiCertificateUrl: string | null;
  gardaVettingUrl: string | null; // Ireland-specific background check
  approvalStatus: "pending" | "active" | "suspended" | "inactive";
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Query parameters your API expects
export interface DriverFilters {
  search?: string;
  status?: string;
  county?: string;
  transmission?: string;
  verified?: boolean;
  minExperience?: number;
  minRating?: number;
  page?: number;
  limit?: number;
}

/**
 * Form data type for creating/editing instructor
 */
export interface InstructorFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  eircode: string;
  dateOfBirth: string;
  drivingLicenseNumber: string;
  licenseExpiryDate: string;
  adiNumber: string;
  adiExpiryDate: string;
  transmission: "manual" | "automatic" | "both";
  hourlyRate: number;
  yearsOfExperience: number;
  bio: string;
  isApproved: boolean;
  approvalStatus: "pending" | "active" | "suspended" | "inactive";
}

/**
 * Ireland counties for dropdown
 */
export const IRELAND_COUNTIES = [
  "Carlow",
  "Cavan",
  "Clare",
  "Cork",
  "Donegal",
  "Dublin",
  "Galway",
  "Kerry",
  "Kildare",
  "Kilkenny",
  "Laois",
  "Leitrim",
  "Limerick",
  "Longford",
  "Louth",
  "Mayo",
  "Meath",
  "Monaghan",
  "Offaly",
  "Roscommon",
  "Sligo",
  "Tipperary",
  "Waterford",
  "Westmeath",
  "Wexford",
  "Wicklow",
] as const;

export type County = (typeof IRELAND_COUNTIES)[number];
