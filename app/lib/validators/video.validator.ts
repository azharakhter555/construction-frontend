// src/lib/validators/video.validator.ts
import { z } from "zod";

export const VIDEO_CATEGORIES = [
  "driving-lessons",
  "parking-tips",
  "road-safety",
  "exam-prep",
  "vehicle-maintenance",
] as const;

export const VIDEO_STATUS = ["published", "draft"] as const;

export const videoFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  category: z.enum(VIDEO_CATEGORIES),
  duration: z
    .number()
    .min(1, "Duration must be at least 1 second")
    .max(3600, "Duration cannot exceed 1 hour"),
  status: z.enum(VIDEO_STATUS).default("draft"),
  tags: z.array(z.string()).optional(), // Changed from string to array of strings
  thumbnail: z.instanceof(File).optional(),
  videoFile: z.instanceof(File).optional(),
});

export type VideoFormData = z.infer<typeof videoFormSchema>;
