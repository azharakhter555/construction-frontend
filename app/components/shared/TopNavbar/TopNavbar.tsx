// components/shared/TopNavbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";

export interface NavItem {
  title: string;
  href?: string;
  icon?: React.ElementType;
  children?: NavItem[];
  disabled?: boolean;
}

interface TopNavbarProps {
  items: NavItem[];
  variant?: "default" | "minimal" | "bordered" | "underlined";
  position?: "left" | "center" | "right";
  className?: string;
  mobileBreakpoint?: "sm" | "md" | "lg" | "xl";
  showSearch?: boolean;
  showNotifications?: boolean;
  showSettings?: boolean;
  showUserMenu?: boolean;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  onSettingsClick?: () => void;
  rightSidebarOpen?: boolean;
  onRightSidebarToggle?: (open: boolean) => void;
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

export function TopNavbar({
  items,
  variant = "default",
  position = "left",
  className,
  mobileBreakpoint = "md",
  showSearch = true,
  showNotifications = true,
  showSettings = true,
  showUserMenu = true,
  userName = "Harry Jones",
  userAvatar,
  rightSidebarOpen = false,
  onRightSidebarToggle,
  onMenuClick,
  isSidebarOpen = false,
}: TopNavbarProps) {
  const [isMobileMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications] = useState([
    { id: 1, title: "New order received", time: "5 min ago", read: false },
    { id: 2, title: "User registration", time: "1 hour ago", read: false },
    { id: 3, title: "Server update", time: "2 hours ago", read: true },
  ]);
  const pathname = usePathname();
  console.log(position, "position");

  const variantStyles = {
    default: "bg-background border-b",
    minimal: "bg-transparent",
    bordered: "bg-background border rounded-lg",
    underlined: "bg-transparent border-b-2 border-transparent",
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Check if a nav item is active
  const isItemActive = (item: NavItem): boolean => {
    if (item.href && pathname === item.href) return true;
    if (item.children) {
      return item.children.some((child) => child.href && pathname.startsWith(child.href));
    }
    return false;
  };

  const renderNavItems = (navItems: NavItem[], isMobile = false) => {
    return navItems.map((item, index) => {
      const isActive = isItemActive(item);
      const IconComponent = item.icon;

      if (item.children && item.children.length > 0) {
        return (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "gap-1.5",
                  isMobile && "w-full justify-start",
                  isActive && "bg-accent text-accent-foreground"
                )}
                disabled={item.disabled}
              >
                {IconComponent && <IconComponent size={18} />}
                {item.title}
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[200px]">
              {renderDropdownItems(item.children)}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }

      const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (item.disabled) {
          e.preventDefault();
          return;
        }
      };

      return (
        <Link
          key={index}
          href={item.disabled ? "#" : item.href || "#"}
          className={cn(
            "px-3 py-2 text-sm font-medium transition-colors rounded-md",
            "hover:bg-accent hover:text-accent-foreground",
            isActive && "bg-accent text-accent-foreground",
            variant === "underlined" &&
              "rounded-none border-b-2 border-transparent hover:border-primary",
            isMobile && "block w-full",
            item.disabled && "opacity-50 pointer-events-none cursor-not-allowed"
          )}
          onClick={handleClick}
          aria-disabled={item.disabled}
        >
          <span className="flex items-center gap-1.5">
            {IconComponent && <IconComponent size={18} />}
            {item.title}
          </span>
        </Link>
      );
    });
  };

  const renderDropdownItems = (items: NavItem[]) => {
    return items.map((item, index) => {
      const IconComponent = item.icon;

      if (item.children && item.children.length > 0) {
        return (
          <DropdownMenuSub key={index}>
            <DropdownMenuSubTrigger
              disabled={item.disabled === undefined ? false : item.disabled}
              className="gap-2"
            >
              {IconComponent && <IconComponent size={16} />}
              {item.title}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>{renderDropdownItems(item.children)}</DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem
          key={index}
          asChild
          disabled={item.disabled === undefined ? false : item.disabled}
        >
          <Link href={item.href || "#"} className="flex items-center gap-2">
            {IconComponent && <IconComponent size={16} />}
            {item.title}
          </Link>
        </DropdownMenuItem>
      );
    });
  };

  return (
    <>
      <nav className={cn("w-full", variantStyles[variant], className)}>
        <div className="flex items-center justify-between h-14 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden border-2 border-orange-500" // Border for debugging
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            <Menu size={20} />
          </Button>
          {/* Left side - Navigation */}
          {/* <div className={cn(
            "hidden",
            mobileBreakpoint === "sm" ? "sm:flex" :
            mobileBreakpoint === "md" ? "md:flex" :
            mobileBreakpoint === "lg" ? "lg:flex" : "xl:flex",
            "items-center gap-1",
            positionStyles[position]
          )}>
            {renderNavItems(items)}
          </div> */}

          {/* Center - Search (optional) */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-8 w-full" />
              </div>
            </div>
          )}

          {/* Right side - Icons & User Menu */}
          <div className="flex items-right gap-1">
            {/* Search icon for mobile */}
            {showSearch && (
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search size={18} />
              </Button>
            )}

            {/* Fullscreen toggle */}
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </Button>

            {/* Dark mode toggle */}
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            {/* Notifications */}
            {showNotifications && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex flex-col items-start p-3"
                    >
                      <div className="flex w-full justify-between">
                        <span className="font-medium">{notification.title}</span>
                        {!notification.read && (
                          <Badge variant="default" className="h-2 w-2 rounded-full p-0" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center text-primary">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Settings - opens right sidebar */}
            {showSettings && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRightSidebarToggle?.(!rightSidebarOpen)}
                className={cn(rightSidebarOpen && "bg-accent")}
              >
                <Settings size={18} />
              </Button>
            )}

            {/* User Menu */}
            {showUserMenu && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userAvatar} />
                      <AvatarFallback>
                        {userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">{userName}</span>
                    <ChevronDown size={16} className="hidden lg:inline" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div
            className={cn(
              mobileBreakpoint === "sm"
                ? "sm:hidden"
                : mobileBreakpoint === "md"
                  ? "md:hidden"
                  : mobileBreakpoint === "lg"
                    ? "lg:hidden"
                    : "xl:hidden",
              "border-t p-4 max-h-[80vh] overflow-y-auto"
            )}
          >
            <div className="flex flex-col space-y-1">{renderNavItems(items, true)}</div>
          </div>
        )}
      </nav>

      {/* Right Sidebar - Settings Panel */}
      <Sheet open={rightSidebarOpen} onOpenChange={onRightSidebarToggle}>
        <SheetContent side="right" className="w-80 sm:w-96">
          <SheetHeader>
            <SheetTitle>Settings & Tools</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="outline" className="justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button variant="outline" className="justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
                <Button variant="outline" className="justify-start text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>

            {/* Appearance */}
            <div>
              <h3 className="text-sm font-medium mb-3">Appearance</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={toggleDarkMode}>
                  {isDarkMode ? (
                    <Sun className="mr-2 h-4 w-4" />
                  ) : (
                    <Moon className="mr-2 h-4 w-4" />
                  )}
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <Minimize2 className="mr-2 h-4 w-4" />
                  ) : (
                    <Maximize2 className="mr-2 h-4 w-4" />
                  )}
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </Button>
              </div>
            </div>

            {/* Dashboard Options */}
            <div>
              <h3 className="text-sm font-medium mb-3">Dashboard Options</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Compact View</span>
                  <Button variant="ghost" size="sm">
                    Toggle
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Show Analytics</span>
                  <Button variant="ghost" size="sm">
                    Toggle
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto Refresh</span>
                  <Button variant="ghost" size="sm">
                    Toggle
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent Items */}
            <div>
              <h3 className="text-sm font-medium mb-3">Recent Items</h3>
              <div className="space-y-2">
                <div className="text-sm p-2 hover:bg-accent rounded-md cursor-pointer">
                  Pages `{">"}` Ecommerce `{">"}` Cart
                </div>
                <div className="text-sm p-2 hover:bg-accent rounded-md cursor-pointer">
                  Products `{">"}` Edit Product
                </div>
                <div className="text-sm p-2 hover:bg-accent rounded-md cursor-pointer">
                  Users `{">"}` Harry Jones
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
