/* eslint-disable @typescript-eslint/no-explicit-any */
// services/http/client.ts

import axios, { type AxiosInstance, type AxiosError, type AxiosRequestConfig } from "axios";
import type { ApiResponse, RequestConfig, ApiError } from "./types";
import { ApiErrorClass } from "./errors";

/**
 * HTTP Client with Axios under the hood.
 * Keeps the same public interface so existing services (auth, etc.) work without changes.
 */
class HttpClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        ...defaultHeaders,
      },
      timeout: 30000,
      withCredentials: false,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Global error handling (e.g., 401 refresh) can be added here later
        return Promise.reject(error);
      }
    );
  }

  setHeader(key: string, value: string): void {
    this.axiosInstance.defaults.headers.common[key] = value;
  }

  removeHeader(key: string): void {
    delete this.axiosInstance.defaults.headers.common[key];
  }

  setAuthToken(token: string): void {
    this.setHeader("Authorization", `Bearer ${token}`);
  }

  clearAuthToken(): void {
    this.removeHeader("Authorization");
  }

  private mapAxiosError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      const serverData = axiosError.response?.data as Partial<ApiError> | undefined;

      if (serverData?.message) {
        throw new ApiErrorClass({
          code: serverData.code || `HTTP_${status}`,
          message: serverData.message,
          details: serverData.details,
          timestamp: serverData.timestamp || new Date().toISOString(),
        });
      }

      if (axiosError.code === "ECONNABORTED" || axiosError.message.includes("timeout")) {
        throw new ApiErrorClass({
          code: "REQUEST_TIMEOUT",
          message: `Request timeout after ${axiosError.config?.timeout || 30000}ms`,
          timestamp: new Date().toISOString(),
        });
      }

      if (!axiosError.response) {
        throw new ApiErrorClass({
          code: "NETWORK_ERROR",
          message: "Network error. Please check your internet connection.",
          timestamp: new Date().toISOString(),
        });
      }

      throw new ApiErrorClass({
        code: `HTTP_${status}`,
        message: this.getDefaultErrorMessage(status || 500),
        timestamp: new Date().toISOString(),
      });
    }

    throw error;
  }

  private getDefaultErrorMessage(status: number): string {
    const messages: Record<number, string> = {
      400: "Bad request. Please check your input.",
      401: "Unauthorized. Please log in again.",
      403: "Forbidden. You don't have permission to access this resource.",
      404: "Resource not found.",
      408: "Request timeout. Please try again.",
      409: "Conflict. The resource already exists.",
      422: "Validation error. Please check your input.",
      429: "Too many requests. Please slow down.",
      500: "Internal server error. Please try again later.",
      502: "Bad gateway. Please try again later.",
      503: "Service unavailable. Please try again later.",
      504: "Gateway timeout. Please try again later.",
    };
    return messages[status] || `HTTP error ${status}`;
  }

  async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const { method = "GET", params, headers, timeout, body, signal } = config;

    const axiosConfig: AxiosRequestConfig = {
      url: endpoint,
      method,
      params,
      headers: {
        ...(this.axiosInstance.defaults.headers.common as Record<string, string>),
        ...((headers as Record<string, string>) || {}),
      },
      timeout: timeout || this.axiosInstance.defaults.timeout,
      data: body as unknown,
      signal: signal ?? undefined,
    };

    try {
      const response = await this.axiosInstance.request<any>(axiosConfig);
      const wrapper = response.data;

      // Unwrap the inner data and keep the wrapper's message & timestamp
      return {
        data: wrapper.data as T, // ✅ actual payload (e.g., { accessToken, ... })
        status: response.status,
        message: wrapper.message || "Request successful",
        timestamp: wrapper.timestamp || new Date().toISOString(),
      };
    } catch (error) {
      this.mapAxiosError(error);
    }
  }
  get<T>(
    endpoint: string,
    config?: Omit<RequestConfig, "method" | "body">
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }
  // services/http/client.ts (excerpt)

  post<T>(
    endpoint: string,
    body?: unknown,
    config?: Omit<RequestConfig, "method" | "body">
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "POST", body });
  }

  put<T>(
    endpoint: string,
    body?: unknown,
    config?: Omit<RequestConfig, "method" | "body">
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "PUT", body });
  }

  patch<T>(
    endpoint: string,
    body?: unknown,
    config?: Omit<RequestConfig, "method" | "body">
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "PATCH", body });
  }
  delete<T>(
    endpoint: string,
    config?: Omit<RequestConfig, "method" | "body">
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

// Singleton instance
const API_URL = process.env["NEXT_PUBLIC_API_URL"] || "http://localhost:5002/api";
export const httpClient = new HttpClient(API_URL);
