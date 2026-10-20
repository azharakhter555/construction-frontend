// config/navigation.ts

/**
 * ============================================================================
 * NAVIGATION STRUCTURE STANDARDS
 * ============================================================================
 * URL Patterns:
 * - Admin: /dashboard/admin/*
 * - Instructor: /dashboard/instructor/*
 * - Student: /dashboard/student/*
 */

import {
  // Top-level icons
  Home,
  Users,
  Calendar,
  Sparkles,
  Settings,
  PlayCircle,
  Wallet,
  CalendarCheck,
  BookOpenCheck,
  ClipboardCheck,
  CalendarX,
  Car,
  MessageSquare,
  Brain,
  Gift,
  Award,
  Route,
  CreditCard,
  LifeBuoy,
  // Admin + Instructor top-level
  GraduationCap,
  DollarSign,
  Video,
  BarChart,
  Server,
  CheckCircle,
  TrendingUp,
  // Child icons
  LayoutDashboard,
  Activity,
  UserCheck,
  Star,
  Percent,
  Banknote,
  UserX,
  Users2,
  ListChecks,
  Radio,
  Scale,
  UserMinus,
  FileWarning,
  PieChart,
  Receipt,
  Landmark,
  FileText,
  Upload,
  FolderTree,
  ListMusic,
  HelpCircle,
  Flame,
  LineChart,
  UsersRound,
  MapPin,
  Filter,
  Target,
  Clock,
  Link2,
  Share2,
  Megaphone,
  KeyRound,
  Webhook,
  HeartPulse,
  UserCog,
  Bell,
  Mail,
  ToggleLeft,
  Sliders,
  FileSpreadsheet,
  Wallet2,
  Timer,
  Eye,
  Send,
  Inbox,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href?: string;
  icon?: LucideIcon;
  children?: NavItem[];
}

// ============================================================================
// ADMIN NAVIGATION
// ============================================================================

export const adminNavigation: NavItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    children: [
      { title: "Overview", href: "/dashboard/admin/overview", icon: LayoutDashboard },
      { title: "Real Time Feed", href: "/dashboard/admin/activity-feed", icon: Activity },
    ],
  },
  {
    title: "Instructors",
    icon: Users,
    children: [
      { title: "All Instructors", href: "/dashboard/admin/drivers", icon: Users },
      { title: "Verifications", href: "/dashboard/admin/drivers/verifications", icon: UserCheck },
      { title: "Performance Reviews", href: "/dashboard/admin/drivers/performance", icon: Star },
      {
        title: "Commission Overrides",
        href: "/dashboard/admin/drivers/commission-overrides",
        icon: Percent,
      },
      { title: "Payout History", href: "/dashboard/admin/drivers/payout-history", icon: Banknote },
    ],
  },
  {
    title: "Students",
    icon: GraduationCap,
    children: [
      { title: "All Students", href: "/dashboard/admin/students", icon: GraduationCap },
      { title: "Active Learners", href: "/dashboard/admin/students/active", icon: UserCheck },
      { title: "Inactive Students", href: "/dashboard/admin/students/inactive", icon: UserX },
      { title: "Student Segments", href: "/dashboard/admin/students/segments", icon: Users2 },
    ],
  },
  {
    title: "Bookings",
    icon: Calendar,
    children: [
      { title: "All Bookings", href: "/dashboard/admin/bookings", icon: ListChecks },
      { title: "Live Bookings", href: "/dashboard/admin/bookings/live", icon: Radio },
      { title: "Dispute Resolution", href: "/dashboard/admin/bookings/disputes", icon: Scale },
      { title: "No-Show Reports", href: "/dashboard/admin/bookings/no-shows", icon: UserMinus },
      {
        title: "Cancellation Log",
        href: "/dashboard/admin/bookings/cancellations",
        icon: FileWarning,
      },
    ],
  },
  {
    title: "Finance",
    icon: DollarSign,
    children: [
      { title: "Revenue Dashboard", href: "/dashboard/admin/finance/revenue", icon: PieChart },
      { title: "Payout Batches", href: "/dashboard/admin/finance/payout-batches", icon: Banknote },
      {
        title: "Stripe Connect",
        href: "/dashboard/admin/finance/stripe-connect",
        icon: CreditCard,
      },
      {
        title: "Commission Reports",
        href: "/dashboard/admin/finance/commission-reports",
        icon: Percent,
      },
      { title: "VAT Reports", href: "/dashboard/admin/finance/vat-reports", icon: Receipt },
      { title: "Transaction Audit", href: "/dashboard/admin/finance/transactions", icon: Landmark },
    ],
  },
  {
    title: "Content Library",
    icon: Video,
    children: [
      { title: "All Videos", href: "/dashboard/admin/content/videos", icon: Video },
      { title: "Upload Video", href: "/dashboard/admin/content/videos/upload", icon: Upload },
      { title: "Categories", href: "/dashboard/admin/content/categories", icon: FolderTree },
      { title: "Playlists", href: "/dashboard/admin/content/playlists", icon: ListMusic },
      { title: "Quiz Bank", href: "/dashboard/admin/content/quizzes", icon: HelpCircle },
      { title: "Featured Content", href: "/dashboard/admin/content/featured", icon: Flame },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart,
    children: [
      {
        title: "Business Intelligence",
        href: "/dashboard/admin/analytics/bi-dashboard",
        icon: LineChart,
      },
      {
        title: "Cohort Retention",
        href: "/dashboard/admin/analytics/cohort-retention",
        icon: UsersRound,
      },
      {
        title: "Geographic Heatmap",
        href: "/dashboard/admin/analytics/geo-distribution",
        icon: MapPin,
      },
      {
        title: "Conversion Funnel",
        href: "/dashboard/admin/analytics/conversion-funnel",
        icon: Filter,
      },
      {
        title: "Instructor Performance",
        href: "/dashboard/admin/analytics/instructor-performance",
        icon: Target,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General", href: "/dashboard/admin/settings/general", icon: Sliders },
      {
        title: "Commission Structure",
        href: "/dashboard/admin/settings/commission",
        icon: Percent,
      },
      {
        title: "Cancellation Policy",
        href: "/dashboard/admin/settings/cancellation-policy",
        icon: FileWarning,
      },
      { title: "Email Templates", href: "/dashboard/admin/settings/email-templates", icon: Mail },
      {
        title: "Push Notifications",
        href: "/dashboard/admin/settings/push-notifications",
        icon: Bell,
      },
      { title: "Feature Flags", href: "/dashboard/admin/settings/feature-flags", icon: ToggleLeft },
    ],
  },
  {
    title: "System",
    icon: Server,
    children: [
      { title: "Audit Logs", href: "/dashboard/admin/system/audit-logs", icon: FileText },
      { title: "System Health", href: "/dashboard/admin/system/health", icon: HeartPulse },
      { title: "User Impersonation", href: "/dashboard/admin/system/impersonate", icon: UserCog },
      { title: "API Keys", href: "/dashboard/admin/system/api-keys", icon: KeyRound },
      { title: "Webhook Logs", href: "/dashboard/admin/system/webhooks", icon: Webhook },
    ],
  },
];

// ============================================================================
// INSTRUCTOR NAVIGATION
// ============================================================================

export const instructorNavigation: NavItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    children: [
      { title: "Today's Schedule", href: "/dashboard/instructor/overview", icon: CalendarCheck },
      {
        title: "Earnings Snapshot",
        href: "/dashboard/instructor/earnings-snapshot",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "Calendar",
    icon: Calendar,
    children: [
      { title: "My Calendar", href: "/dashboard/instructor/calendar", icon: Calendar },
      {
        title: "Set Availability",
        href: "/dashboard/instructor/calendar/availability",
        icon: Clock,
      },
    ],
  },
  {
    title: "Bookings",
    icon: CheckCircle,
    children: [
      {
        title: "Upcoming Lessons",
        href: "/dashboard/instructor/bookings/upcomming",
        icon: CalendarCheck,
      },
      { title: "Booking Requests", href: "/dashboard/instructor/bookings/requests", icon: Inbox },
      { title: "Past Lessons", href: "/dashboard/instructor/bookings/past", icon: ClipboardCheck },
      {
        title: "Cancellations",
        href: "/dashboard/instructor/bookings/cancelled",
        icon: CalendarX,
      },
    ],
  },
  {
    title: "My Students",
    icon: GraduationCap,
    children: [
      { title: "Active Students", href: "/dashboard/instructor/students", icon: Users },
      {
        title: "Student Progress",
        href: "/dashboard/instructor/students/progress",
        icon: LineChart,
      },
      { title: "Student Notes", href: "/dashboard/instructor/students/notes", icon: FileText },
      { title: "Bulk Message", href: "/dashboard/instructor/students/message", icon: Send },
    ],
  },
  {
    title: "Earnings",
    icon: DollarSign,
    children: [
      { title: "Payout Dashboard", href: "/dashboard/instructor/earnings", icon: Wallet2 },
      {
        title: "Transaction History",
        href: "/dashboard/instructor/earnings/transactions",
        icon: Receipt,
      },
      {
        title: "Commission Breakdown",
        href: "/dashboard/instructor/earnings/commission",
        icon: Percent,
      },
      {
        title: "Tax Summary",
        href: "/dashboard/instructor/earnings/tax-summary",
        icon: FileSpreadsheet,
      },
      {
        title: "Set Hourly Rate",
        href: "/dashboard/instructor/earnings/hourly-rate",
        icon: DollarSign,
      },
    ],
  },
  {
    title: "My Content",
    icon: Video,
    children: [
      { title: "Uploaded Videos", href: "/dashboard/instructor/content/videos", icon: Video },
      {
        title: "Video Performance",
        href: "/dashboard/instructor/content/performance",
        icon: BarChart,
      },
      {
        title: "Create Quiz",
        href: "/dashboard/instructor/content/quizzes/create",
        icon: HelpCircle,
      },
      { title: "Share Resources", href: "/dashboard/instructor/content/resources", icon: Share2 },
    ],
  },
  {
    title: "Insights",
    icon: BarChart,
    children: [
      {
        title: "Student Pass Rate",
        href: "/dashboard/instructor/insights/pass-rate",
        icon: Target,
      },
      { title: "My Reviews", href: "/dashboard/instructor/insights/reviews", icon: Star },
      { title: "Response Time", href: "/dashboard/instructor/insights/response-time", icon: Clock },
      { title: "Busiest Hours", href: "/dashboard/instructor/insights/busy-hours", icon: Flame },
    ],
  },
  {
    title: "Grow",
    icon: TrendingUp,
    children: [
      { title: "Referral Link", href: "/dashboard/instructor/grow/referrals", icon: Link2 },
      {
        title: "Student Referral Code",
        href: "/dashboard/instructor/grow/student-referrals",
        icon: Share2,
      },
      { title: "My Public Profile", href: "/dashboard/instructor/grow/public-profile", icon: Eye },
      {
        title: "Request Featured Spot",
        href: "/dashboard/instructor/grow/request-featured",
        icon: Megaphone,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "Profile", href: "/dashboard/instructor/settings/profile", icon: Users },
      {
        title: "Teaching Locations",
        href: "/dashboard/instructor/settings/locations",
        icon: MapPin,
      },
      {
        title: "Notification Preferences",
        href: "/dashboard/instructor/settings/notifications",
        icon: Bell,
      },
      {
        title: "Payment Account",
        href: "/dashboard/instructor/settings/payment",
        icon: CreditCard,
      },
      { title: "Buffer Time", href: "/dashboard/instructor/settings/buffer-time", icon: Timer },
    ],
  },
];

// ============================================================================
// STUDENT NAVIGATION
// ============================================================================

export const studentNavigation: NavItem[] = [
  {
    title: "Booking Lessons",
    icon: CalendarCheck,
    children: [
      { title: "Book a Lesson", href: "/dashboard/student/bookings", icon: CalendarCheck },
      { title: "My Bookings", href: "/dashboard/student/my-bookings", icon: Calendar },
      { title: "Past Lessons", href: "/dashboard/student/bookings/past", icon: ClipboardCheck },
    ],
  },
  {
    title: "Learn to Drive",
    icon: PlayCircle,
    children: [
      {
        title: "Recommended for You",
        href: "/dashboard/student/learn/recommended",
        icon: Sparkles,
      },
      { title: "Video Library", href: "/dashboard/student/learn/videos", icon: PlayCircle },
      { title: "Continue Watching", href: "/dashboard/student/learn/continue", icon: PlayCircle },
      { title: "My Watch History", href: "/dashboard/student/learn/history", icon: ClipboardCheck },
      { title: "Downloaded Videos", href: "/dashboard/student/learn/downloads", icon: PlayCircle },
    ],
  },
  {
    title: "Test Prep",
    icon: BookOpenCheck,
    children: [
      {
        title: "Theory Test Simulator",
        href: "/dashboard/student/test-prep/theory",
        icon: ClipboardCheck,
      },
      {
        title: "Hazard Perception",
        href: "/dashboard/student/test-prep/hazard-perception",
        icon: PlayCircle,
      },
      { title: "Road Signs Quiz", href: "/dashboard/student/test-prep/road-signs", icon: Route },
      {
        title: "Important Points",
        href: "/dashboard/student/test-prep/important-points",
        icon: BookOpenCheck,
      },
      {
        title: "Pre-Test Checklist",
        href: "/dashboard/student/test-prep/checklist",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    title: "Book Driving Test",
    icon: ClipboardCheck,
    children: [
      { title: "How to Book", href: "/dashboard/student/test-booking/how-to", icon: BookOpenCheck },
      {
        title: "How to Prepare",
        href: "/dashboard/student/test-booking/prepare",
        icon: ClipboardCheck,
      },
      { title: "Find Test Centre", href: "/dashboard/student/test-booking/centres", icon: Route },
      {
        title: "Cancellation Policy",
        href: "/dashboard/student/test-booking/policy",
        icon: BookOpenCheck,
      },
    ],
  },
  {
    title: "Cancelled Test Slots",
    icon: CalendarX,
    children: [
      { title: "All Cancelled Slots", href: "/dashboard/student/cancelled-slots", icon: CalendarX },
      {
        title: "Near My Test Centre",
        href: "/dashboard/student/cancelled-slots/nearby",
        icon: Route,
      },
      {
        title: "Alerts & Notifications",
        href: "/dashboard/student/cancelled-slots/alerts",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Buy & Rent Car",
    icon: Car,
    children: [
      { title: "Buy a Car", href: "/dashboard/student/cars/buy", icon: Car },
      { title: "Rent for Test Day", href: "/dashboard/student/cars/rent", icon: Car },
      { title: "Car Checklist", href: "/dashboard/student/cars/checklist", icon: ClipboardCheck },
    ],
  },
  {
    title: "AI Assistant",
    icon: Sparkles,
    children: [
      { title: "Ask Anything", href: "/dashboard/student/ai/tutor", icon: Sparkles },
      { title: "Mock Examiner", href: "/dashboard/student/ai/mock-examiner", icon: Brain },
      {
        title: "Analyse My Test",
        href: "/dashboard/student/ai/test-feedback",
        icon: ClipboardCheck,
      },
      { title: "Find My Instructor", href: "/dashboard/student/ai/instructor-match", icon: Route },
    ],
  },
  {
    title: "Wallet",
    icon: Wallet,
    children: [
      {
        title: "Payment Methods",
        href: "/dashboard/student/wallet/payment-methods",
        icon: CreditCard,
      },
      {
        title: "Transaction History",
        href: "/dashboard/student/wallet/transactions",
        icon: ClipboardCheck,
      },
      { title: "Buy Package", href: "/dashboard/student/wallet/packages", icon: Wallet },
      { title: "Redeem Gift Card", href: "/dashboard/student/wallet/redeem", icon: Gift },
      { title: "Referral Credits", href: "/dashboard/student/wallet/referrals", icon: Award },
    ],
  },
  {
    title: "Messages",
    icon: MessageSquare,
    children: [
      { title: "Chat with Instructor", href: "/dashboard/student/messages", icon: MessageSquare },
      {
        title: "Announcements",
        href: "/dashboard/student/messages/announcements",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "Profile & Licence", href: "/dashboard/student/settings/profile", icon: Users },
      {
        title: "Preferred Transmission",
        href: "/dashboard/student/settings/transmission",
        icon: Car,
      },
      {
        title: "Notifications",
        href: "/dashboard/student/settings/notifications",
        icon: MessageSquare,
      },
      { title: "Privacy", href: "/dashboard/student/settings/privacy", icon: Settings },
      { title: "Help & Support", href: "/dashboard/student/settings/support", icon: LifeBuoy },
    ],
  },
];

// ============================================================================
// ROLE-BASED GETTER
// ============================================================================

export type UserRole = "admin" | "instructor" | "student";

export const getNavigationByRole = (role: UserRole): NavItem[] => {
  switch (role) {
    case "admin":
      return adminNavigation;
    case "instructor":
      return instructorNavigation;
    case "student":
      return studentNavigation;
    default:
      return [];
  }
};

// Default export for backward compatibility
export const navigation: NavItem[] = adminNavigation;
