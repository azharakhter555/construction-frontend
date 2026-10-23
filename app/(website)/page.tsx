import { Hero } from "../components/layout/Hero";
// import { VideoFeature } from "../components/sections/DrivingLessons";
import { HowItWorks } from "../components/sections/HowWork";
import { ServicesSection } from "../components/sections/ServicesSection";
import { SERVICESWITHIMAGE } from "../lib/constants";
import { SectorsSection } from "../components/sections/FirstLessonSection";
import { WhyChooseUsSection } from "../components/sections/WhyChooseUsSection";
import { GallerySection } from "../components/sections/DrivingSections";
import { FAQSection } from "../components/sections/FAQSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <ServicesSection
        heading="Our Specialist Ceiling & Partition Services in Dublin"
        subheading="What we do."
        services={SERVICESWITHIMAGE}
      />
      <SectorsSection />
      {/* <VideoFeature
        videoId="dQw4w9WgXcQ" // ← your actual YouTube video ID
        title='Suspended Ceiling <span class="text-secondary">Installation</span> in Dublin'
        description="Paddy Kehoe Suspended Ceilings are known for their excellent workmanship. We call out, measure up, quote and show sample tiles — making your decision an easy one. Fire sealing over suspended ceilings now available."
      /> */}
      <HowItWorks />
      <GallerySection />
      <WhyChooseUsSection />

      <FAQSection />
    </div>
  );
}
