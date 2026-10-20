import { cn } from "@/lib/utils"

interface UserProfileProps {
  sidebarOpen: boolean
}

export function UserProfile({ sidebarOpen }: UserProfileProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 pt-2 border-t",
        !sidebarOpen ? "justify-center" : "px-1"
      )}
    >
      <div className="relative">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-medium text-primary">JD</span>
        </div>

        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-1 ring-background"></span>
      </div>

      {sidebarOpen && (
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">John Doe</p>
          <p className="text-xs text-muted-foreground truncate">
            john@example.com
          </p>
        </div>
      )}
    </div>
  )
}