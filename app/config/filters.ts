// config/filters.ts
import type { InputType, Option } from "@/types/types";

export interface FilterConfig {
  id: string;
  label: string;
  type: InputType;
  placeholder?: string;
  options?: Option[];
  defaultValue?: unknown;
  disabled?: boolean;
  hidden?: boolean;
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: unknown) => boolean | string; // 👈 Add this line
  };
  dependencies?: string[]; // IDs of filters this depends on
  condition?: (values: Record<string, unknown>) => boolean; // Show/hide based on other values
  props?: Record<string, unknown>; // Additional props for the filter component
  section?: string; // Group filters into sections
  order?: number; // Display order
  width?: "full" | "half" | "third" | "quarter";
}

// Create an index file for easy imports
export * from "./filters";
