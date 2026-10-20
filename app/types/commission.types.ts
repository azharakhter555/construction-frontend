// types/commission.types.ts
export interface CommissionRow {
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

  // ── commission ──
  defaultRate: number; // platform default, e.g. 15 (%)
  overrideRate: number | null; // custom rate, null = no override
  effectiveRate: number; // overrideRate ?? defaultRate
  overrideType: "percentage" | "fixed"; // percentage of lesson OR fixed € per lesson
  fixedFee: number | null; // used when overrideType === "fixed"

  // ── earnings ──
  monthlyLessons: number;
  monthlyGross: number; // what the instructor earned this month
  monthlyCommission: number; // admin's cut this month
  totalCommission: number; // lifetime admin cut
  lastOverrideAt: string | null;
  overriddenBy: string | null; // admin name
  note: string | null;
}

export interface CommissionKpis {
  totalInstructors: number;
  overriddenCount: number;
  defaultRate: number;
  monthlyCommission: number;
  totalCommission: number;
  topEarner: { name: string; amount: number } | null;
  averageRate: number;
}
