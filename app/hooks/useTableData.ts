// hooks/useTableData.ts
import { useState, useEffect, useCallback, useRef } from "react";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page?: number;
  limit?: number;
}

// Simple deep equality check
function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }
  return true;
}

export function useTableData<T>(
  fetchFn: (params: Record<string, any>) => Promise<PaginatedResponse<T>>,
  params: Record<string, any>
) {
  const [data, setData] = useState<PaginatedResponse<T>>({ data: [], total: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Refs to store the latest fetch function and params
  const fetchFnRef = useRef(fetchFn);
  const paramsRef = useRef(params);

  // Keep refs updated on every render
  useEffect(() => {
    fetchFnRef.current = fetchFn;
    paramsRef.current = params;
  });

  // Stable fetch function – uses refs, so it never changes
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchFnRef.current(paramsRef.current);
      console.log("response", response);
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch data"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Track mount and previous params
  const isFirstRender = useRef(true);
  const prevParamsRef = useRef(params);

  // Effect to trigger fetch when needed
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchData();
      return;
    }

    // Only fetch if params have actually changed (deep compare)
    if (!deepEqual(params, prevParamsRef.current)) {
      prevParamsRef.current = params;
      fetchData();
    }
  }, [params, fetchData]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refresh };
}
