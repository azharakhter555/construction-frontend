// app/context/SidebarContext.tsx
"use client";

import { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface SidebarContextType {
  open: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  // ✅ Always start with true - no localStorage, no window check
  const [open, setOpen] = useState(true);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ open, toggle, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}