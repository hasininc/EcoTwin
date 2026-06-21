import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTwin } from '../context/TwinContext';
import PageWrapper from '../components/layout/PageWrapper';
import LegacyReport from '../components/legacy/LegacyReport';

export default function LegacyPage() {
  const { twinGenerated } = useTwin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!twinGenerated) {
      navigate('/create');
    }
  }, [twinGenerated, navigate]);

  if (!twinGenerated) return null;

  return (
    <PageWrapper>
      <div className="bg-radial-glow min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LegacyReport />
        </div>
      </div>
    </PageWrapper>
  );
}
