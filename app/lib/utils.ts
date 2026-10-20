// lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS support
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format number as currency (Euro)
 */
export function formatCurrency(value?: number): string {
  if (value === undefined || value === null) return "€0";
  return `€${value.toLocaleString()}`;
}

export function formatDuration(seconds: number): string {
  if (isNaN(seconds)) return "0:00";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Format number with thousand separators
 */
export function formatNumber(value?: number): string {
  if (value === undefined || value === null) return "0";
  return value.toLocaleString();
}

/**
 * Format percentage change with + or - sign
 */
export function formatChange(value?: number): string {
  if (value === undefined || value === null) return "0%";
  return `${value > 0 ? "+" : ""}${value}%`;
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string, format: "full" | "short" = "full"): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (format === "short") {
    return d.toLocaleDateString("en-IE", {
      day: "numeric",
      month: "short",
    });
  }

  return d.toLocaleDateString("en-IE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
