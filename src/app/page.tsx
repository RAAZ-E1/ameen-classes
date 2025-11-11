import HeroSection, { Slideshow } from '@/components/hero-section';
import StatsSection from '@/components/stats-section';
import FeaturesSection from '@/components/features-section';
import LatestUpdatesSection from '@/components/latest-updates-section';
import TestimonialsSection from '@/components/testimonials-section';


export default function HomePage() {
  return (
    <main>
      <HeroSection />
      {/* Mobile Slideshow - appears between hero and stats on mobile */}
      <section className="lg:hidden py-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-sm mx-auto px-4">
          <Slideshow />
        </div>
      </section>
      <StatsSection />
      <FeaturesSection />
      <LatestUpdatesSection />
      <TestimonialsSection />
    </main>
  );
}