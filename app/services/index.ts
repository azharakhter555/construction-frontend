// services/index.ts

// HTTP Layer
export { httpClient } from "./http/client";
export { ApiErrorClass, isApiError } from "./http/errors";
export type { ApiResponse, ApiError, RequestConfig } from "./http/types";

// Dashboard Service
export { dashboardService } from "./dashboard/dashboard.service";
export type {
  DashboardStats,
  RevenueDataPoint,
  BookingsDataPoint,
  UserGrowthDataPoint,
  BookingStatusDataPoint,
  TopInstructor,
  DashboardFilter,
  DashboardData,
} from "./dashboard/dashboard.types";
