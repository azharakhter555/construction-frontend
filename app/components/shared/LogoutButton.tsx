import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";

interface LogoutButtonProps {
  onLogout: () => void
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  const { open } = useSidebar();
  return (
    <button
      onClick={onLogout}
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-sm rounded-md w-full text-left hover:bg-destructive/10 hover:text-destructive transition-colors",
        !open && "justify-center"
      )}
      title={!open ? "Logout" : undefined}
    >
      <LogOut size={18} />
      {open && <span>Logout</span>}
    </button>
  )
}