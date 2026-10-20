// services/auth/auth.service.ts

import { httpClient } from "../http/client";
import type {
  SignupResponse,
  LoginResponse,
  RefreshResponse,
  LoginRequest,
  SignupRequest,
} from "./auth.types";

class AuthService {
  async signup(data: SignupRequest): Promise<SignupResponse> {
    const response = await httpClient.request<SignupResponse>("/auth/signup", {
      method: "POST",
      body: data,
    });
    return response.data;
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await httpClient.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: data,
    });
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<string> {
    const response = await httpClient.request<RefreshResponse>("/auth/refresh", {
      method: "POST",
      body: { refreshToken },
    });
    return response.data.accessToken;
  }

  async logout(): Promise<void> {
    // optional server call
  }

  /**
   * Verify email with token from the verification link
   */
  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>("/auth/verify-email", { token });
    return response.data;
  }

  /**
   * Resend verification email
   */
  async resendVerification(email: string): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>("/auth/resend-verification", {
      email,
    });
    return response.data;
  }

  /**
   * Reset Password
   */
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  }

  /**
   * Forget Password
   */

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>("/auth/forgot-password", { email });
    return response.data;
  }
}

export const authService = new AuthService();
