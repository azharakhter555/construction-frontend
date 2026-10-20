// services/http/errors.ts

import type { ApiError } from "./types";

/**
 * Custom Error class for API errors
 * Extends native Error for proper stack traces and instanceof checks
 */
export class ApiErrorClass extends Error {
  code: string;
  details?: Record<string, string[]>;
  timestamp: string;

  constructor(data: ApiError) {
    super(data.message);
    this.name = "ApiError";
    this.code = data.code;
    this.details = data.details;
    this.timestamp = data.timestamp;
  }

  /**
   * Check if error is a specific HTTP status code
   */
  isStatus(code: number): boolean {
    return this.code === `HTTP_${code}`;
  }

  /**
   * Check if error is a network/timeout error
   */
  isNetworkError(): boolean {
    return this.code === "NETWORK_ERROR" || this.code === "REQUEST_TIMEOUT";
  }

  /**
   * Check if error is a validation error
   */
  isValidationError(): boolean {
    return this.code === "VALIDATION_ERROR";
  }

  /**
   * Get field-specific error message
   */
  getFieldError(field: string): string | undefined {
    return this.details?.[field]?.[0];
  }
}

/**
 * Type guard to check if an error is ApiErrorClass
 */
export function isApiError(error: unknown): error is ApiErrorClass {
  return error instanceof ApiErrorClass;
}
