// services/instructor/instructor.service.ts

import { httpClient } from "../http/client";
import type { Instructor, InstructorFormData } from "@/types/instructor.types";
import { instructorFormSchema } from "@/lib/validators/instructor.validator";
import {
  dummyInstructors,
  generateDummyInstructor,
  dummyPaginatedResponse,
} from "@/lib/dummy-data/instructor.data";

// Feature flag for mock data
const USE_MOCK_DATA = process.env["NEXT_PUBLIC_USE_MOCK_DATA"] === "true";

class InstructorService {
  /**
   * Create a new instructor
   */
  async create(data: InstructorFormData): Promise<Instructor> {
    const validated = instructorFormSchema.parse(data);

    // if (USE_MOCK_DATA) {
    //   return this.mockCreate(validated);
    // }
    console.log("validated api call for created", validated);

    const response = await httpClient.post<Instructor>("/instructors", validated);
    return response.data;
  }

  /**
   * Get all instructors with pagination
   */
  async getAll(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<{
    data: Instructor[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    if (USE_MOCK_DATA) {
      return this.mockGetAll(params);
    }

    const response = await httpClient.get<{
      data: Instructor[];
      total: number;
      page: number;
      totalPages: number;
    }>("/instructors", { params });

    return response.data;
  }

  private async mockGetAll(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<{
    data: Instructor[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const page = params?.page || 1;
    const limit = params?.limit || 10;

    // Filter by status
    let filtered = [...dummyInstructors];
    if (params?.status && params.status !== "all") {
      filtered = filtered.filter((i) => i.status === params.status);
    }

    // Filter by search
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.firstName.toLowerCase().includes(searchLower) ||
          i.lastName.toLowerCase().includes(searchLower) ||
          i.email.toLowerCase().includes(searchLower)
      );
    }

    // ✅ USE the helper function
    return dummyPaginatedResponse(filtered, page, limit);
  }

  /**
   * Get single instructor by ID
   */
  async getById(id: string): Promise<Instructor> {
    if (USE_MOCK_DATA) {
      return this.mockGetById(id);
    }

    const response = await httpClient.get<Instructor>(`/instructors/${id}`);
    return response.data;
  }

  private async mockGetById(id: string): Promise<Instructor> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const instructor = dummyInstructors.find((i) => i.id === id);
    if (!instructor) {
      throw new Error("Instructor not found");
    }

    return instructor;
  }

  /**
   * Update instructor
   */
  async update(id: string, data: Partial<InstructorFormData>): Promise<Instructor> {
    const validated = instructorFormSchema.partial().parse(data);

    // if (USE_MOCK_DATA) {
    //   return this.mockUpdate(id, validated);
    // }

    const response = await httpClient.patch<Instructor>(`/instructors/${id}`, validated);
    return response.data;
  }

  private async mockUpdate(id: string, data: Partial<InstructorFormData>): Promise<Instructor> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const instructor = dummyInstructors.find((i) => i.id === id);
    if (!instructor) {
      throw new Error("Instructor not found");
    }

    // Return updated instructor
    return {
      ...instructor,
      ...data,
      updatedAt: new Date().toISOString(),
    };
  }

  /**
   * Delete instructor
   */
  async delete(id: string): Promise<void> {
    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return;
    }

    await httpClient.delete(`/instructors/${id}`);
  }

  /**
   * Upload document
   */
  async uploadDocument(
    instructorId: string,
    file: File,
    type: "profile" | "id" | "adi" | "garda"
  ): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    if (USE_MOCK_DATA) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { url: `https://mock-storage.example.com/${instructorId}/${type}_${Date.now()}.jpg` };
    }

    const response = await httpClient.post<{ url: string }>(
      `/instructors/${instructorId}/documents`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data;
  }
}

export const instructorService = new InstructorService();
