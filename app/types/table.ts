/* eslint-disable @typescript-eslint/no-explicit-any */
// Base column configuration that all modules will use
export interface BaseColumnConfig<T> {
  accessorKey: keyof T | string; // Which field to display
  header: string; // Column header text
  cell?: (value: any, row: T) => React.ReactNode; // Custom renderer
  enableSorting?: boolean;
  enableHiding?: boolean;
  size?: number; // Column width
}
