// app/(website)/layout.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsAppButton } from "@/components/shared/buttons/FloatingChatButton";
import { FloatingScrollToTop } from "@/components/shared/buttons/FloatingScrollToTop";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingScrollToTop />
      <FloatingWhatsAppButton />
    </div>
  );
}
