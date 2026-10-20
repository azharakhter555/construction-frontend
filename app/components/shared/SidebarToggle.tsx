"use client";

import { Menu } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";

export function SidebarToggle() {
  const { open, toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      className="p-1.5 rounded-md hover:bg-muted/30 transition-colors focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-0"
      aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
      aria-expanded={open}
    >
      <Menu size={20} aria-hidden="true" />
    </button>
  );
}