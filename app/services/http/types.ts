// services/http/types.ts

// Standard API Response wrapper
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  timestamp: string;
}

// Standard API Error structure
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  timestamp: string;
}

// Request configuration options – we define our own, not extending RequestInit
export interface RequestConfig {
  method?: HttpMethod;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>; // or HeadersInit
  body?: unknown; // ✅ now accepts any JSON object
  timeout?: number;
  signal?: AbortSignal | null; // for cancellation
  // you can add other fetch options if needed, but we don't extend RequestInit
} // services/http/types.ts

// Standard API Response wrapper
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  timestamp: string;
}

// Standard API Error structure
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  timestamp: string;
}

// HTTP Methods supported
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Request configuration options – we define our own, not extending RequestInit
export interface RequestConfig {
  method?: HttpMethod;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>; // or HeadersInit
  body?: unknown; // ✅ now accepts any JSON object
  timeout?: number;
  signal?: AbortSignal | null; // for cancellation
  // you can add other fetch options if needed, but we don't extend RequestInit
}
