// services/dashboard/dashboard.service.ts

import { httpClient } from "../http/client";
import type {
  DashboardStats,
  RevenueDataPoint,
  BookingsDataPoint,
  UserGrowthDataPoint,
  BookingStatusDataPoint,
  TopInstructor,
  DashboardFilter,
  DashboardData,
} from "./dashboard.types";
import {
  dummyDashboardStats,
  dummyRevenueData,
  dummyBookingsData,
  dummyUserGrowthData,
  dummyBookingStatusData,
  dummyTopInstructors,
} from "@/lib/dummy-data/dashboard.data";

// Feature flag for using mock data
const USE_MOCK_DATA = process.env["NEXT_PUBLIC_USE_MOCK_DATA"] === "true";

/**
 * Service for dashboard-related API calls
 * Handles both mock data (development) and real API calls
 */
class DashboardService {
  /**
   * Simulates network delay in development
   * Helps test loading states and skeletons
   */
  private async addDelay<T>(data: T, ms: number = 500): Promise<T> {
    if (process.env.NODE_ENV === "development") {
      return new Promise((resolve) => setTimeout(() => resolve(data), ms));
    }
    return Promise.resolve(data);
  }

  /**
   * Build query params from filter
   */
  private buildFilterParams(filter?: DashboardFilter): Record<string, string> {
    const params: Record<string, string> = {};

    if (filter?.from) {
      params["from"] = filter.from.toISOString();
    }
    if (filter?.to) {
      params["to"] = filter.to.toISOString();
    }
    if (filter?.instructorId) {
      params["instructorId"] = filter.instructorId;
    }

    return params;
  }

  /**
   * Get dashboard statistics
   */
  async getStats(filter?: DashboardFilter): Promise<DashboardStats> {
    if (USE_MOCK_DATA) {
      return this.addDelay(dummyDashboardStats);
    }

    const response = await httpClient.get<DashboardStats>("/dashboard/stats", {
      params: this.buildFilterParams(filter),
    });
    return response.data;
  }

  /**
   * Get revenue chart data
   */
  async getRevenue(filter?: DashboardFilter): Promise<RevenueDataPoint[]> {
    if (USE_MOCK_DATA) {
      return this.addDelay(dummyRevenueData);
    }

    const response = await httpClient.get<RevenueDataPoint[]>("/dashboard/revenue", {
      params: this.buildFilterParams(filter),
    });
    return response.data;
  }

  /**
   * Get bookings chart data
   */
  async getBookings(filter?: DashboardFilter): Promise<BookingsDataPoint[]> {
    if (USE_MOCK_DATA) {
      return this.addDelay(dummyBookingsData);
    }

    const response = await httpClient.get<BookingsDataPoint[]>("/dashboard/bookings", {
      params: this.buildFilterParams(filter),
    });
    return response.data;
  }

  /**
   * Get user growth chart data
   */
  async getUserGrowth(filter?: DashboardFilter): Promise<UserGrowthDataPoint[]> {
    if (USE_MOCK_DATA) {
      return this.addDelay(dummyUserGrowthData);
    }

    const response = await httpClient.get<UserGrowthDataPoint[]>("/dashboard/user-growth", {
      params: this.buildFilterParams(filter),
    });
    return response.data;
  }

  /**
   * Get booking status distribution
   */
  async getBookingStatus(filter?: DashboardFilter): Promise<BookingStatusDataPoint[]> {
    if (USE_MOCK_DATA) {
      return this.addDelay(dummyBookingStatusData);
    }

    const response = await httpClient.get<BookingStatusDataPoint[]>("/dashboard/booking-status", {
      params: this.buildFilterParams(filter),
    });
    return response.data;
  }

  /**
   * Get top performing instructors
   */
  async getTopInstructors(filter?: DashboardFilter): Promise<TopInstructor[]> {
    if (USE_MOCK_DATA) {
      return this.addDelay(dummyTopInstructors, 800);
    }

    const response = await httpClient.get<TopInstructor[]>("/dashboard/top-instructors", {
      params: {
        ...this.buildFilterParams(filter),
        limit: "5",
      },
    });
    return response.data;
  }

  /**
   * Get all dashboard data in parallel
   * Use this for initial page load
   */
  async getAllDashboardData(filter?: DashboardFilter): Promise<DashboardData> {
    const [stats, revenue, bookings, userGrowth, bookingStatus, topInstructors] = await Promise.all(
      [
        this.getStats(filter),
        this.getRevenue(filter),
        this.getBookings(filter),
        this.getUserGrowth(filter),
        this.getBookingStatus(filter),
        this.getTopInstructors(filter),
      ]
    );

    return {
      stats,
      revenue,
      bookings,
      userGrowth,
      bookingStatus,
      topInstructors,
    };
  }
}

// Singleton export
export const dashboardService = new DashboardService();
