import type { FooterLink } from "@/components/shared/DashboardFooter";

export const footerLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact", href: "/contact" },
  { label: "Documentation", href: "/docs", external: true },
];
