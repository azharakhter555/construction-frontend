// lib/hooks/useInstructors.ts
"use client";

import { useState } from "react";
import useSWR from "swr";
import { instructorService } from "@/services/instructors/instructor.service";
import type { InstructorFormData, Instructor } from "@/types/instructor.types";
import type { ZodError } from "zod";

// ============================================================================
// TYPES
// ============================================================================

interface UseInstructorsParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

interface UseCreateInstructorOptions {
  onSuccess?: (instructor: Instructor) => void;
  onError?: (error: Error | ZodError) => void;
}

interface UseUpdateInstructorOptions {
  onSuccess?: (instructor: Instructor) => void;
  onError?: (error: Error | ZodError) => void;
}

interface UseDeleteInstructorOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

// ============================================================================
// READ HOOK: Fetch instructors with pagination
// ============================================================================

export function useInstructors(params?: UseInstructorsParams) {
  const cacheKey = params ? ["instructors", params] : ["instructors"];

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    cacheKey,
    () => instructorService.getAll(params),
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
// READ HOOK: Fetch single instructor by ID
// ============================================================================

export function useInstructor(id: string) {
  const cacheKey = id ? ["instructor", id] : null;

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    cacheKey,
    () => instructorService.getById(id),
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
// CREATE HOOK: Add new instructor
// ============================================================================

export function useCreateInstructor(options?: UseCreateInstructorOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | ZodError | null>(null);
  const [data, setData] = useState<Instructor | null>(null);

  const mutate = async (formData: InstructorFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const instructor = await instructorService.create(formData);
      setData(instructor);
      options?.onSuccess?.(instructor);
      return instructor;
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
// UPDATE HOOK: Edit existing instructor
// ============================================================================

export function useUpdateInstructor(options?: UseUpdateInstructorOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | ZodError | null>(null);
  const [data, setData] = useState<Instructor | null>(null);

  const mutate = async (id: string, formData: Partial<InstructorFormData>) => {
    setIsLoading(true);
    setError(null);

    try {
      const instructor = await instructorService.update(id, formData);
      setData(instructor);
      options?.onSuccess?.(instructor);
      return instructor;
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
// DELETE HOOK: Remove instructor
// ============================================================================

export function useDeleteInstructor(options?: UseDeleteInstructorOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await instructorService.delete(id);
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

// ============================================================================
// UPLOAD HOOK: Upload documents
// ============================================================================

interface UseUploadDocumentOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
}

export function useUploadDocument(options?: UseUploadDocumentOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const upload = async (
    instructorId: string,
    file: File,
    type: "profile" | "id" | "adi" | "garda"
  ) => {
    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate progress for mock mode
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const result = await instructorService.uploadDocument(instructorId, file, type);

      clearInterval(interval);
      setProgress(100);
      setUrl(result.url);
      options?.onSuccess?.(result.url);
      return result.url;
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
    setUrl(null);
    setError(null);
    setIsLoading(false);
    setProgress(0);
  };

  return {
    upload,
    isLoading,
    error,
    url,
    progress,
    reset,
  };
}
