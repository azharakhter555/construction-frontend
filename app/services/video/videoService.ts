/* eslint-disable @typescript-eslint/no-explicit-any */
// services/video/video.service.ts

import { httpClient } from "../http/client";
import type { Video, VideoFormData, VideosResponse } from "@/types/video.types";
import { videoFormSchema } from "@/lib/validators/video.validator";
import {
  dummyVideos,
  generateDummyVideo,
  dummyPaginatedResponse,
} from "@/lib/dummy-data/video.data";

// Feature flag for mock data
const USE_MOCK_DATA = process.env["NEXT_PUBLIC_USE_MOCK_DATA"] === "true";

class VideoService {
  /**
   * Create a new video
   */
  async create(data: VideoFormData): Promise<Video> {
    const validated: any = videoFormSchema.parse(data);

    if (USE_MOCK_DATA) {
      return this.mockCreate(validated);
    }

    const response = await httpClient.post<Video>("/admin/videos", validated);
    return response.data;
  }

  private async mockCreate(data: VideoFormData): Promise<Video> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate duplicate title error
    if (dummyVideos.some((v) => v.title === data.title)) {
      throw new Error("Video with this title already exists");
    }

    // Generate new video with mock data
    const newVideo = generateDummyVideo(data);
    // Ensure thumbnail is string, not File
    return {
      ...newVideo,
      thumbnail: typeof data.thumbnail === "string" ? data.thumbnail : newVideo.thumbnail,
    };
  }

  /**
   * Get all videos with pagination and filters
   */
  async getAll(params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    search?: string;
    minDuration?: number;
    maxDuration?: number;
    sortBy?: string;
  }): Promise<VideosResponse> {
    if (USE_MOCK_DATA) {
      return this.mockGetAll(params);
    }

    const response = await httpClient.get<VideosResponse>("/admin/videos", { params });
    return response.data;
  }

  private async mockGetAll(params?: {
    page?: number;
    limit?: number;
    status?: string;
    category?: string;
    search?: string;
    minDuration?: number;
    maxDuration?: number;
    sortBy?: string;
  }): Promise<VideosResponse> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const page = params?.page || 1;
    const limit = params?.limit || 10;

    // Filter by status
    let filtered = [...dummyVideos];
    if (params?.status && params.status !== "all") {
      filtered = filtered.filter((v) => v.status === params.status);
    }

    // Filter by category
    if (params?.category && params.category !== "all") {
      filtered = filtered.filter((v) => v.category === params.category);
    }

    // Filter by search
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.title.toLowerCase().includes(searchLower) ||
          v.description?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by duration range
    if (params?.minDuration) {
      filtered = filtered.filter((v) => v.duration >= params.minDuration!);
    }
    if (params?.maxDuration) {
      filtered = filtered.filter((v) => v.duration <= params.maxDuration!);
    }

    // Sort
    if (params?.sortBy) {
      const [field, order] = params.sortBy.split(":");
      filtered.sort((a, b) => {
        const aVal = a[field as keyof Video];
        const bVal = b[field as keyof Video];

        if (aVal === undefined && bVal === undefined) return 0;
        if (aVal === undefined) return 1;
        if (bVal === undefined) return -1;

        if (order === "desc") {
          return aVal > bVal ? -1 : 1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }

    // Use the helper function for pagination
    const paginated: any = dummyPaginatedResponse(filtered, page, limit);

    // Map to VideosResponse type (using 'pages' instead of 'totalPages')
    return {
      data: paginated.data,
      total: paginated.total,
      page: paginated.page,
      limit: paginated.limit,
      pages: paginated.totalPages, // Map totalPages to pages
    };
  }

  /**
   * Get single video by ID
   */
  async getById(id: string | number): Promise<Video> {
    if (USE_MOCK_DATA) {
      return this.mockGetById(id);
    }

    const response = await httpClient.get<Video>(`/admin/videos/${id}`);
    return response.data;
  }

  private async mockGetById(id: string | number): Promise<Video> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const video = dummyVideos.find((v) => v.id === id);
    if (!video) {
      throw new Error("Video not found");
    }

    return video;
  }

  /**
   * Update video
   */
  async update(id: string | number, data: Partial<VideoFormData>): Promise<Video> {
    const validated: any = videoFormSchema.partial().parse(data);

    if (USE_MOCK_DATA) {
      return this.mockUpdate(id, validated);
    }

    const response = await httpClient.patch<Video>(`/admin/videos/${id}`, validated);
    return response.data;
  }

  private async mockUpdate(id: string | number, data: Partial<VideoFormData>): Promise<Video> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const video = dummyVideos.find((v) => v.id === id);
    if (!video) {
      throw new Error("Video not found");
    }

    // Prepare update data, ensuring thumbnail is string if provided
    const updateData: any = {
      ...data,
      updatedAt: new Date().toISOString(),
    };

    // Remove thumbnail if it's a File object
    if (updateData.thumbnail && typeof updateData.thumbnail !== "string") {
      delete updateData.thumbnail;
    }

    // Return updated video
    return {
      ...video,
      ...updateData,
    };
  }

  /**
   * Delete video
   */
  async delete(id: string | number): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return;
    }

    await httpClient.delete(`/admin/videos/${id}`);
  }

  /**
   * Upload video file
   */
  async uploadVideo(
    videoId: string | number,
    file: File,
    type: "video" | "thumbnail"
  ): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        url: `https://mock-storage.example.com/videos/${videoId}/${type}_${Date.now()}.${file.name.split(".").pop()}`,
      };
    }

    const response = await httpClient.post<{ url: string }>(
      `/admin/videos/${videoId}/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  }

  /**
   * Bulk delete videos
   */
  async bulkDelete(ids: (string | number)[]): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return;
    }

    await httpClient.post("/admin/videos/bulk-delete", { ids });
  }

  /**
   * Update video status (publish/draft/archive)
   */
  async updateStatus(id: string | number, status: Video["status"]): Promise<Video> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const video = dummyVideos.find((v) => v.id === id);
      if (!video) {
        throw new Error("Video not found");
      }
      return {
        ...video,
        status,
        updatedAt: new Date().toISOString(),
      };
    }

    const response = await httpClient.patch<Video>(`/admin/videos/${id}/status`, { status });
    return response.data;
  }
}

export const videoService = new VideoService();
