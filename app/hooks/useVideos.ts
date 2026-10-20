/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useVideos.ts
"use client";

import { useState } from "react";
import useSWR from "swr";
import { videoService } from "@/services/video/videoService";
import type { Video, VideoFormData } from "@/types/video.types";
import type { ZodError } from "zod";

// ============================================================================
// TYPES
// ============================================================================

interface UseVideosParams {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  search?: string;
  minDuration?: number;
  maxDuration?: number;
  sortBy?: string;
}

interface UseCreateVideoOptions {
  onSuccess?: (video: Video) => void;
  onError?: (error: Error | ZodError) => void;
}

interface UseUpdateVideoOptions {
  onSuccess?: (video: Video) => void;
  onError?: (error: Error | ZodError) => void;
}

interface UseDeleteVideoOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

// ============================================================================
// READ HOOK: Fetch videos with pagination
// ============================================================================

export function useVideos(params?: UseVideosParams) {
  // Create a complete params object with defaults
  const completeParams = {
    page: params?.page ?? 1,
    limit: params?.limit ?? 10,
    ...(params?.status && { status: params.status }),
    ...(params?.category && { category: params.category }),
    ...(params?.search && { search: params.search }),
    ...(params?.minDuration && { minDuration: params.minDuration }),
    ...(params?.maxDuration && { maxDuration: params.maxDuration }),
    ...(params?.sortBy && { sortBy: params.sortBy }),
  };

  const cacheKey = params ? ["videos", params] : ["videos", { page: 1, limit: 10 }];

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    cacheKey,
    () => videoService.getAll(completeParams), // Changed from getVideos to getAll
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      errorRetryCount: 3,
    }
  );

  return {
    data,
    error,
    isLoading,
    isRefreshing: isValidating,
    refresh: mutate,
  };
}

// ============================================================================
// READ HOOK: Fetch single video by ID
// ============================================================================

export function useVideo(id: string | number) {
  const cacheKey = id ? ["video", id] : null;

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    cacheKey,
    () => videoService.getById(id), // Changed from getVideo to getById
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      errorRetryCount: 3,
    }
  );

  return {
    data,
    error,
    isLoading,
    isRefreshing: isValidating,
    refresh: mutate,
  };
}

// ============================================================================
// CREATE HOOK: Add new video
// ============================================================================

export function useCreateVideo(options?: UseCreateVideoOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | ZodError | null>(null);
  const [data, setData] = useState<Video | null>(null);

  const mutate = async (formData: VideoFormData) => {
    // Changed from FormData to VideoFormData
    setIsLoading(true);
    setError(null);

    try {
      const video = await videoService.create(formData); // Changed from createVideo to create
      setData(video);
      options?.onSuccess?.(video);
      return video;
    } catch (err) {
      const error = err as Error | ZodError;
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    mutate,
    isLoading,
    error,
    data,
    reset,
  };
}

// ============================================================================
// UPDATE HOOK: Edit existing video
// ============================================================================

export function useUpdateVideo(options?: UseUpdateVideoOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | ZodError | null>(null);
  const [data, setData] = useState<Video | null>(null);

  const mutate = async (id: string | number, formData: Partial<VideoFormData>) => {
    // Changed from FormData to Partial<VideoFormData>
    setIsLoading(true);
    setError(null);

    try {
      const video = await videoService.update(id, formData); // Changed from updateVideo to update
      setData(video);
      options?.onSuccess?.(video);
      return video;
    } catch (err) {
      const error = err as Error | ZodError;
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    mutate,
    isLoading,
    error,
    data,
    reset,
  };
}

// ============================================================================
// DELETE HOOK: Remove video
// ============================================================================

export function useDeleteVideo(options?: UseDeleteVideoOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string | number) => {
    setIsLoading(true);
    setError(null);

    try {
      await videoService.delete(id); // Changed from deleteVideo to delete
      options?.onSuccess?.();
    } catch (err) {
      const error = err as Error;
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setIsLoading(false);
  };

  return {
    mutate,
    isLoading,
    error,
    reset,
  };
}
