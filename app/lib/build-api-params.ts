// lib/build-api-params.ts
import type { FilterConfig, FilterState } from "@/types/filter";

export function buildApiQueryString(
  configs: FilterConfig[],
  values: FilterState,
  extraParams: Record<string, any> = {}
): string {
  const params: Record<string, any> = { ...extraParams };
  // ... same mapping logic as buildQueryParams
  // then convert to query string
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}
