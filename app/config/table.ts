import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";

export const variantStyles = {
  default: "border rounded-lg",
  bordered: "border-2 rounded-lg",
  striped: "border rounded-lg [&_tbody_tr:nth-child(odd)]:bg-muted/50",
  minimal: "",
  modern: "border rounded-xl shadow-sm overflow-hidden",
};

// Density styles
export const densityStyles = {
  compact: {
    table: "text-sm",
    cell: "px-3 py-2",
    header: "px-3 py-2 text-xs font-medium",
  },
  normal: {
    table: "text-sm",
    cell: "px-4 py-3",
    header: "px-4 py-3 text-sm font-medium",
  },
  comfortable: {
    table: "text-base",
    cell: "px-6 py-4",
    header: "px-6 py-4 text-base font-medium",
  },
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title?: string;
  description?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  filterable?: boolean;
  filters?: ReactNode;
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  onExport?: () => void;
  onExportCSV?: () => void;
  onExportExcel?: () => void;
  onPrint?: () => void;
  onRefresh?: () => void;
  variant?: "default" | "modern" | "striped" | "bordered";
  className?: string;
  density?: "compact" | "normal" | "comfortable";
  stickyHeader?: boolean;
  showColumnToggle?: boolean;
  showTotal?: boolean;
  totalText?: string;
  emptyMessage?: string;
  loading?: boolean;

  // ✅ SERVER-SIDE PAGINATION PROPS
  manualPagination?: boolean;
  totalItems?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onSearchChange?: (value: string) => void;
  searchDebounceMs?: number;
}

export const userModuleFilter: unknown = [
  {
    id: "search",
    label: "Search Users",
    type: "text",
    placeholder: "Search by name or email...",
    width: "full",
    defaultValue: "",
    props: {
      helperText: "Type to search",
    },
  },
  {
    id: "role",
    label: "Role",
    type: "select",
    options: [
      { label: "All Roles", value: "all" },
      { label: "Admin", value: "Admin", count: 2 },
      { label: "User", value: "User", count: 3 },
      { label: "Editor", value: "Editor", count: 2 },
    ],
    defaultValue: "all",
    section: "User Details",
    width: "half",
  },
  {
    id: "status",
    label: "Status",
    type: "radio",
    options: [
      { label: "All", value: "all" },
      { label: "Active", value: "Active", count: 4 },
      { label: "Inactive", value: "Inactive", count: 1 },
      { label: "Pending", value: "Pending", count: 2 },
    ],
    defaultValue: "all",
    section: "User Details",
    width: "half",
  },
  {
    id: "dateRange",
    label: "Registration Date",
    type: "date-range",
    section: "Date Filters",
    width: "full",
    defaultValue: {
      from: undefined,
      to: undefined,
    },
  },
  {
    id: "verified",
    label: "Email Verified",
    type: "switch",
    defaultValue: undefined, // ✅ CRITICAL: undefined = no filter
    section: "Status",
    width: "half",
  },
  {
    id: "rating",
    label: "Minimum Rating",
    type: "rating",
    defaultValue: 0,
    props: {
      max: 5,
      showValue: true,
    },
    section: "Activity",
    width: "half",
  },
];
