import HeroSection from '@/components/hero-section';
import StatsSection from '@/components/stats-section';
import FeaturesSection from '@/components/features-section';
import LatestUpdatesSection from '@/components/latest-updates-section';
import TestimonialsSection from '@/components/testimonials-section';
import CTASection from '@/components/cta-section';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <LatestUpdatesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}