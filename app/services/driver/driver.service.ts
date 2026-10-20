// services/driver/driver.service.ts

import { httpClient } from "../http/client";
import type { Instructor, PaginatedResponse, DriverFilters } from "@/types/instructor.types";
import { buildQueryString } from "@/lib/query-utils";
import type { InstructorFormData } from "@/lib/validators/instructor.validator";
class DriverService {
  async getDrivers(params: DriverFilters): Promise<PaginatedResponse<Instructor>> {
    const url = `/instructors/paginated${buildQueryString(params)}`;
    const response: any = await httpClient.request<PaginatedResponse<any>>(url, { method: "GET" });
    // Flatten the nested user fields into the root object

    const flattenedData = response.data.map((item: any) => ({
      ...item,
      firstName: item.user?.firstName || "",
      lastName: item.user?.lastName || "",
      email: item.user?.email || "",
    }));
    return {
      ...response.data,
      data: flattenedData,
    };
  }

  async createDriver(data: Partial<Instructor>) {
    const response = await httpClient.request<Instructor>("/instructors", {
      method: "POST",
      body: data,
    });
    return response.data;
  }

  async updateDriver(id: string, data: Partial<InstructorFormData>) {
    const response = await httpClient.request<InstructorFormData>(`/instructors/${id}`, {
      method: "PATCH",
      body: data,
    });
    return response.data;
  }

  async deleteDriver(id: string) {
    await httpClient.request(`/instructors/${id}`, { method: "DELETE" });
  }
}

export const driverService = new DriverService();
