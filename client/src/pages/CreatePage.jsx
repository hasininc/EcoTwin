import PageWrapper from '../components/layout/PageWrapper';
import OnboardingWizard from '../components/onboarding/OnboardingWizard';

export default function CreatePage() {
  return (
    <PageWrapper>
      <div className="bg-radial-glow min-h-screen pt-20 md:pt-24 pb-8">
        <OnboardingWizard />
      </div>
    </PageWrapper>
  );
}
