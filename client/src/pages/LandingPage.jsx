import PageWrapper from '../components/layout/PageWrapper';
import Hero from '../components/landing/Hero';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorks from '../components/landing/HowItWorks';
import StatsSection from '../components/landing/StatsSection';

export default function LandingPage() {
  return (
    <PageWrapper>
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <StatsSection />
    </PageWrapper>
  );
}
