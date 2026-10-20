/* eslint-disable @typescript-eslint/no-explicit-any */
// components/shared/filters/hooks/useFilters.ts
"use client";

import { useState, useCallback, useMemo } from "react";
import type { FilterConfig, FilterState } from "@/types/filter";
import { isFilterValueActive } from "@/types/filter";

export function useFilters(configs: FilterConfig[], initialValues?: FilterState) {
  const getDefaultValue = useCallback((type: string): any => {
    switch (type) {
      case "multi-select":
      case "checkbox":
        return [];
      case "date-range":
        return { from: undefined, to: undefined };
      case "number-range":
        return { min: undefined, max: undefined };
      case "switch":
        return undefined;
      case "rating":
        return 0;
      case "slider":
        return [0];
      case "color":
        return "#000000";
      default:
        return "";
    }
  }, []);

  const [values, setValues] = useState<FilterState>(() => {
    const defaults: FilterState = {};
    configs.forEach((config) => {
      defaults[config.id] =
        initialValues?.[config.id] ?? config.defaultValue ?? getDefaultValue(config.type);
    });
    return defaults;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // ─────────────────────────────────────────────────────────────
  // Validation
  // ─────────────────────────────────────────────────────────────
  const validateFilter = useCallback((config: FilterConfig, value: any): string | null => {
    if (!config.validation) return null;

    const { required, min, max, minLength, maxLength, pattern, custom } = config.validation;

    if (required && (value === undefined || value === null || value === "")) {
      return `${config.label} is required`;
    }

    if (typeof value === "number") {
      if (min !== undefined && value < min) {
        return `${config.label} must be at least ${min}`;
      }
      if (max !== undefined && value > max) {
        return `${config.label} must be at most ${max}`;
      }
    }

    if (typeof value === "string" && value) {
      if (minLength !== undefined && value.length < minLength) {
        return `${config.label} must be at least ${minLength} characters`;
      }
      if (maxLength !== undefined && value.length > maxLength) {
        return `${config.label} must be at most ${maxLength} characters`;
      }
      if (pattern && !pattern.test(value)) {
        return `${config.label} has invalid format`;
      }
    }

    if (Array.isArray(value) && required && value.length === 0) {
      return `${config.label} is required`;
    }

    if (custom) {
      const result = custom(value);
      if (typeof result === "string") return result;
      if (!result) return `${config.label} is invalid`;
    }

    return null;
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Setters
  // ─────────────────────────────────────────────────────────────
  const setFilter = useCallback(
    (id: string, value: any) => {
      setValues((prev) => ({ ...prev, [id]: value }));

      const config = configs.find((c) => c.id === id);
      if (config) {
        const error = validateFilter(config, value);
        if (error) {
          setErrors((prev) => ({ ...prev, [id]: error }));
        } else {
          setErrors((prev) => {
            const { [id]: _, ...rest } = prev;
            return rest;
          });
        }
      }
    },
    [configs, validateFilter]
  );

  const setFilters = useCallback(
    (newValues: FilterState) => {
      setValues((prev) => ({ ...prev, ...newValues }));

      const newErrors: Record<string, string> = {};
      Object.entries(newValues).forEach(([id, value]) => {
        const config = configs.find((c) => c.id === id);
        if (config) {
          const error = validateFilter(config, value);
          if (error) {
            newErrors[id] = error;
          }
        }
      });

      setErrors((prev) => ({ ...prev, ...newErrors }));
    },
    [configs, validateFilter]
  );

  const setTouchedField = useCallback((id: string) => {
    setTouched((prev) => ({ ...prev, [id]: true }));
  }, []);

  const resetFilters = useCallback(() => {
    const defaults: FilterState = {};
    configs.forEach((config) => {
      defaults[config.id] = config.defaultValue ?? getDefaultValue(config.type);
    });
    setValues(defaults);
    setErrors({});
    setTouched({});
  }, [configs, getDefaultValue]);

  const clearFilter = useCallback(
    (id: string) => {
      const config = configs.find((c) => c.id === id);
      if (config) {
        setValues((prev) => ({
          ...prev,
          [id]: config.defaultValue ?? getDefaultValue(config.type),
        }));
        setErrors((prev) => {
          const { [id]: _, ...rest } = prev;
          return rest;
        });
      }
    },
    [configs, getDefaultValue]
  );

  // ─────────────────────────────────────────────────────────────
  // Derived state — SINGLE source of truth via isFilterValueActive
  // ─────────────────────────────────────────────────────────────
  const activeCount = useMemo(() => {
    return configs.reduce((n, config) => {
      // The quick-search text box never counts as an "active filter"
      if (config.id === "search") return n;
      return n + (isFilterValueActive(values[config.id], config) ? 1 : 0);
    }, 0);
  }, [values, configs]);

  const hasActiveFilters = activeCount > 0;

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  const isDirty = useMemo(() => {
    return Object.keys(values).some((id) => {
      const config = configs.find((c) => c.id === id);
      if (!config) return false;
      const defaultValue = config.defaultValue ?? getDefaultValue(config.type);
      return JSON.stringify(values[id]) !== JSON.stringify(defaultValue);
    });
  }, [values, configs, getDefaultValue]);

  return {
    values,
    errors,
    touched,
    setFilter,
    setFilters,
    setTouched: setTouchedField,
    resetFilters,
    clearFilter,
    hasActiveFilters,
    activeCount,
    isValid,
    isDirty,
  };
}
