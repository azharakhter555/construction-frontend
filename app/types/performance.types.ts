// services/performance/performance.types.ts
export interface InstructorPerformance {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl?: string | null;
  };
  county: string;
  transmission: string;
  yearsOfExperience: number;

  // ── performance metrics ──
  averageRating: number; // 0–5
  totalReviews: number;
  totalLessons: number;
  completedLessons: number;
  cancelledLessons: number;
  passRate: number; // 0–100
  responseTimeHours: number; // avg hours to reply
  monthlyEarnings: number; // last 30 days
  totalEarnings: number;
  lastReviewAt: string | null;
  trend: "up" | "down" | "flat";
}

export interface PerformanceKpis {
  totalInstructors: number;
  totalReviews: number;
  averageRating: number;
  averagePassRate: number;
  topPerformer: { name: string; rating: number } | null;
  newReviewsThisMonth: number;
}
