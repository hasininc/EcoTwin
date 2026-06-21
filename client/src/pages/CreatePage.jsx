import PageWrapper from '../components/layout/PageWrapper';
import OnboardingWizard from '../components/onboarding/OnboardingWizard';

export default function CreatePage() {
  return (
    <PageWrapper>
      <div className="bg-radial-glow">
        <OnboardingWizard />
      </div>
    </PageWrapper>
  );
}
