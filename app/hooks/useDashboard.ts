// lib/hooks/useDashboard.ts
"use client";

import useSWR from "swr";
import { dashboardService } from "@/services";
import type { DashboardData } from "@/services";

const CACHE_KEY = "dashboard:overview";

export function useDashboard() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<DashboardData>(
    CACHE_KEY,
    () => dashboardService.getAllDashboardData(),
    {
      revalidateOnFocus: false, // Don't refetch when tab focuses
      revalidateOnReconnect: true, // Refetch when internet reconnects
      refreshInterval: 0, // Auto-refresh every 30 seconds
      errorRetryCount: 3, // Retry 3 times on error
      errorRetryInterval: 5000, // Wait 5 seconds between retries
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
