// src/types/video.types.ts

export interface Video {
  id: string | number;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration: number; // in seconds
  size: number; // in bytes
  format: string; // mp4, webm, etc.
  status: "published" | "draft" | "archived";
  views: number;
  likes: number;
  tags: string[];
  category: string;
  uploadedBy: {
    id: number;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Add VideoFormData type
export interface VideoFormData {
  title: string;
  description: string;
  category: string;
  duration: number;
  status?: "published" | "draft" | "archived";
  tags?: string[];
  thumbnail?: File;
  videoFile?: File;
}

export interface VideoFilters {
  search?: string;
  status?: string;
  category?: string;
  minDuration?: number;
  maxDuration?: number;
  sortBy?: "newest" | "oldest" | "mostViewed" | "mostLiked";
  tags?: string[];
  uploadedBy?: number;
}

export interface VideosResponse {
  data: Video[];
  total: number;
  page: number;
  limit: number;
  pages: number; // Changed from 'totalPages' to 'pages' to match your type
}
