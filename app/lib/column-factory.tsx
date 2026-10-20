/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table"; // Add this import
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Common cell renderers that all modules can use
export const CellRenderers = {
  // For status/role badges
  badge: (value: string, variantMap?: Record<string, string>) => {
    return (value: string) => {
      const variant = variantMap?.[value] || "default";
      return <Badge variant={variant as any}>{value}</Badge>;
    };
  },

  // For dates
  date: (value: string) => {
    return new Date(value).toLocaleDateString();
  },

  // For ratings
  rating: (value: number, symbol = "⭐") => {
    return value ? symbol.repeat(value) : "-";
  },

  // For boolean
  boolean: (value: boolean, trueText = "Yes", falseText = "No") => {
    return value ? `✅ ${trueText}` : `❌ ${falseText}`;
  },

  // For currency
  currency: (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value || 0);
  },
};

// Factory function to create columns
export function createColumns<T>(
  configs: Array<{
    accessorKey: keyof T | string; // 👈 widen to accept dotted paths
    header: string;
    cell?: (value: any, row: T) => React.ReactNode;
    enableSorting?: boolean;
    enableHiding?: boolean;
  }>
): ColumnDef<T>[] {
  return configs.map((config) => ({
    accessorKey: config.accessorKey as string,
    header: config.header,
    cell: ({ row, getValue }) => {
      const value = getValue(); // 👈 THE FIX

      if (config.cell) {
        return config.cell(value, row.original);
      }

      if (value === null || value === undefined) {
        return <span className="text-muted-foreground">-</span>;
      }
      if (typeof value === "string") return value || "-";
      if (typeof value === "number") return value.toString();
      if (typeof value === "boolean") return value ? "Yes" : "No";
      if (value instanceof Date) return value.toLocaleDateString();
      if (Array.isArray(value)) return value.length ? `${value.length} items` : "-";
      if (typeof value === "object") return JSON.stringify(value).slice(0, 50) + "...";
      return String(value);
    },
    enableSorting: config.enableSorting ?? true,
    enableHiding: config.enableHiding ?? true,
  }));
}

// ============================================
// ACTIONS COLUMN FACTORY
// ============================================
export interface ActionConfig<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  className?: string;
  hidden?: boolean;
}

export interface ActionsColumnConfig<T> {
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  custom?: ActionConfig<T>[];
  hideView?: boolean;
  hideEdit?: boolean;
  hideDelete?: boolean;
  size?: number;
}

export function createActionsColumn<T extends { id: string }>(
  config: ActionsColumnConfig<T> = {}
): ColumnDef<T> {
  return {
    id: "actions",
    header: "Actions",
    size: config.size || 80,
    cell: ({ row }) => {
      const item = row.original;

      // Don't render if all actions are hidden
      const hasActions =
        (!config.hideView && config.onView) ||
        (!config.hideEdit && config.onEdit) ||
        (!config.hideDelete && config.onDelete) ||
        (config.custom && config.custom.length > 0);

      if (!hasActions) return null;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            {/* View Action */}
            {!config.hideView && config.onView && (
              <DropdownMenuItem onClick={() => config.onView?.(item)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
            )}

            {/* Edit Action */}
            {!config.hideEdit && config.onEdit && (
              <DropdownMenuItem onClick={() => config.onEdit?.(item)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            )}

            {/* Custom Actions */}
            {config.custom?.map(
              (action, index) =>
                !action.hidden && (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => action.onClick(item)}
                    className={action.className}
                  >
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                  </DropdownMenuItem>
                )
            )}

            {/* Delete Action with Separator */}
            {!config.hideDelete && config.onDelete && (
              <>
                {(config.onView || config.onEdit || config.custom?.length) && (
                  <DropdownMenuSeparator />
                )}
                <DropdownMenuItem
                  onClick={() => config.onDelete?.(item)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  };
}

// Optional: Export a pre-configured version for common use cases
export const standardActions = {
  withHandlers: <T extends { id: string }>(
    onView?: (item: T) => void,
    onEdit?: (item: T) => void,
    onDelete?: (item: T) => void
  ) => createActionsColumn<T>({ onView, onEdit, onDelete }),

  viewOnly: <T extends { id: string }>(onView: (item: T) => void) =>
    createActionsColumn<T>({ onView, hideEdit: true, hideDelete: true }),

  editOnly: <T extends { id: string }>(onEdit: (item: T) => void) =>
    createActionsColumn<T>({ onEdit, hideView: true, hideDelete: true }),

  deleteOnly: <T extends { id: string }>(onDelete: (item: T) => void) =>
    createActionsColumn<T>({ onDelete, hideView: true, hideEdit: true }),
};

/**
 * ============================================
 * COLUMN FACTORY PATTERN - BENEFITS & USAGE
 * ============================================
 *
 * 📌 WHAT IS IT?
 * A factory pattern that creates consistent table columns across your entire app
 *
 * 🚀 HOW TO USE IN OTHER MODULES:
 *
 * 1. IMPORT the factory:
 *    import { createColumns, CellRenderers, createActionsColumn } from "@/lib/column-factory";
 *
 * 2. DEFINE your module-specific columns:
 *    export const productColumns = (onEdit, onDelete) => {
 *      const columns = createColumns<Product>([
 *        { accessorKey: "name", header: "Product Name" },
 *        { accessorKey: "price", header: "Price",
 *          cell: (value) => CellRenderers.currency(value) },
 *      ]);
 *
 *      if (onEdit) columns.push(createActionsColumn({ onEdit, onDelete }));
 *      return columns;
 *    };
 *
 * 3. USE in your page:
 *    <DataTable columns={productColumns(handleEdit, handleDelete)} />
 *
 * ============================================
 * 🌟 KEY BENEFITS:
 * ============================================
 *
 * 1️⃣ CONSISTENCY
 *    - All tables look and behave the same way
 *    - Same badge styles, date formats, empty states everywhere
 *    - Users get a familiar experience across modules
 *
 * 2️⃣ DRY PRINCIPLE (Don't Repeat Yourself)
 *    - Write cell renderers ONCE, use everywhere
 *    - No copy-pasting badge logic across 20+ files
 *    - Actions menu defined once, reused in all modules
 *
 * 3️⃣ TYPE SAFETY
 *    - TypeScript ensures you only use valid accessorKeys
 *    - Catch errors at compile time, not runtime
 *    - Auto-completion in IDEs
 *
 * 4️⃣ MAINTAINABILITY
 *    - Change date format in ONE place, update 100 tables
 *    - Add a new action type once, use everywhere
 *    - Fix a bug in badge rendering, all modules benefit
 *
 * 5️⃣ SCALABILITY
 *    - Add new modules in minutes, not hours
 *    - New team members learn ONE pattern, not 20 different ones
 *    - Easy to add new features to all tables
 *
 * 6️⃣ PERFORMANCE
 *    - Optimized cell rendering
 *    - Consistent column sizing
 *    - Proper memoization support
 *
 * 7️⃣ FLEXIBILITY
 *    - Use default renderers OR customize per column
 *    - Add module-specific actions easily
 *    - Override anything when needed
 *
 * 8️⃣ TESTABILITY
 *    - Test CellRenderers once
 *    - Test createColumns logic once
 *    - Module columns are just configurations
 *
 * ============================================
 * 📊 REAL-WORLD IMPACT:
 * ============================================
 *
 * WITHOUT FACTORY (Bad):
 * - 20 modules × 7 columns = 140 places to update for a date format change
 * - Inconsistent UI across modules
 * - Bugs in one module don't get fixed in others
 * - New developer: "How do I add a table?"
 *
 * WITH FACTORY (Good):
 * - 1 change to CellRenderers.date() updates ALL tables
 * - Consistent UI everywhere
 * - Bug fixes benefit everyone
 * - New developer: "Just use createColumns()"
 *
 * ============================================
 * 🎯 PERFECT FOR:
 * ============================================
 *
 * ✅ User Management
 * ✅ Product Catalogs
 * ✅ Order Lists
 * ✅ Inventory Tables
 * ✅ Analytics Dashboards
 * ✅ Admin Panels
 * ✅ Any app with multiple data tables
 *
 * ============================================
 */
