// lib/validators/instructor.validator.ts
import { z } from "zod";
import { IRELAND_COUNTIES } from "@/types/instructor.types";

export const instructorFormSchema = z.object({
  // ── Editable fields ──
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^(\+353|0)\d{8,10}$/),
  address: z.string().min(5).max(200),
  city: z.string().min(2).max(50),
  county: z.enum(IRELAND_COUNTIES as unknown as [string, ...string[]]),
  eircode: z.string().regex(/^[A-Z0-9]{3}\s?[A-Z0-9]{4}$/i),
  dateOfBirth: z.string(),
  drivingLicenseNumber: z.string(),
  licenseExpiryDate: z.string(),
  adiNumber: z.string(),
  adiExpiryDate: z.string(),
  transmission: z.enum(["manual", "automatic", "both"]),
  hourlyRate: z.number().min(30).max(100),
  yearsOfExperience: z.number().min(0).max(50),
  bio: z.string().optional().default(""),

  // ── Server-managed but included if you want to send them ──
  role: z.enum(["admin", "instructor", "student"]).default("instructor"),
  isActive: z.boolean().default(true),
  emailVerified: z.boolean().default(false),
  avatarUrl: z.string().optional(),
  rating: z.number().default(0),
  isApproved: z.boolean().default(false),
  approvalStatus: z.enum(["pending", "approved", "rejected"]).default("pending"),
  profileComplete: z.boolean().default(false),
});

export type InstructorFormData = z.infer<typeof instructorFormSchema>;
