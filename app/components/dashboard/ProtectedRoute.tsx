// components/ProtectedRoute.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

// Role → dashboard path mapping
const ROLE_ROUTES: Record<string, string> = {
  admin: '/dashboard/roles/admin',
  instructor: '/dashboard/roles/instructor',
  student: '/dashboard/roles/student',
  'car-dealer': '/dashboard/roles/car-dealer',
};

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Wait for auth to load
    if (isLoading) return;

    // 1. No token → redirect to login
    if (!token || !user) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // 2. Email not verified → redirect to verification
    if (!user.emailVerified && !pathname.includes('email-verify')) {
      router.push('/auth/email-verify');
      return;
    }

    // 3. If user is at the base /dashboard, redirect to their role-specific page
    if (pathname === '/dashboard') {
      const target = ROLE_ROUTES[user.role] || '/dashboard/roles/student';
      router.push(target);
      return;
    }

    // 4. If user is trying to access a role page that doesn't match their role
    const roleMatch = pathname.match(/^\/dashboard\/roles\/(admin|instructor|student|car-dealer)/);
    if (roleMatch) {
      const requestedRole = roleMatch[1];
      if (requestedRole !== user.role) {
        const target = ROLE_ROUTES[user.role] || '/dashboard/roles/student';
        router.push(target);
        return;
      }
    }

    // All checks passed
    setIsAuthorized(true);
  }, [user, token, isLoading, router, pathname]);

  // Show loading state while checking authorization
  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
}