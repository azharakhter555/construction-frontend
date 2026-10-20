// src/lib/dummy-data/video.data.ts
import type { Video, VideosResponse } from "@/types/video.types";

// Mock video data
export const dummyVideos: Video[] = [
  {
    id: "1",
    title: "Introduction to Driving",
    description: "Basic driving techniques for beginners",
    category: "beginner",
    duration: 300, // 5 minutes in seconds
    status: "published",
    thumbnailUrl: "https://example.com/thumbnails/driving-intro.jpg",
    videoUrl: "https://example.com/videos/driving-intro.mp4",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Parallel Parking Mastery",
    description: "Learn how to parallel park like a pro",
    category: "intermediate",
    duration: 450, // 7.5 minutes
    status: "published",
    thumbnailUrl: "https://example.com/thumbnails/parallel-parking.jpg",
    videoUrl: "https://example.com/videos/parallel-parking.mp4",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: "3",
    title: "Highway Driving Tips",
    description: "Safe highway driving techniques",
    category: "advanced",
    duration: 600, // 10 minutes
    status: "draft",
    thumbnailUrl: "https://example.com/thumbnails/highway-driving.jpg",
    videoUrl: "https://example.com/videos/highway-driving.mp4",
    createdAt: "2024-01-25T10:00:00Z",
    updatedAt: "2024-01-25T10:00:00Z",
  },
];

/**
 * Generate a dummy video for mock creation
 */
export function generateDummyVideo(data: any): Video {
  return {
    id: String(Date.now()),
    title: data.title,
    description: data.description,
    category: data.category,
    duration: data.duration,
    status: data.status || "draft",
    thumbnailUrl: `https://mock-storage.example.com/videos/thumbnails/${Date.now()}.jpg`,
    videoUrl: `https://mock-storage.example.com/videos/${Date.now()}.mp4`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Get paginated response for dummy data
 */
export function dummyPaginatedResponse<T>(data: T[], page: number, limit: number): VideosResponse {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = data.slice(startIndex, endIndex);
  const total = data.length;
  const totalPages = Math.ceil(total / limit);

  return {
    data: paginatedData,
    total,
    page,
    totalPages,
    limit,
  };
}
