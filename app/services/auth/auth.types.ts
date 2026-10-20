// services/auth/auth.types.ts

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// The exact shape returned by your backend for signup/login
export type SignupResponse = AuthTokens & { user: AuthUser };
export type LoginResponse = AuthTokens & { user: AuthUser };
export type RefreshResponse = { accessToken: string };

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: "student" | "instructor" | "admin" | "car-dealer"; // optional
}
