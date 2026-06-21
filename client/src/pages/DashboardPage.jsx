import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTwin } from '../context/TwinContext';
import PageWrapper from '../components/layout/PageWrapper';
import SummaryCards from '../components/dashboard/SummaryCards';
import TwinProfile from '../components/dashboard/TwinProfile';
import EmissionsBreakdown from '../components/dashboard/EmissionsBreakdown';
import AIInsightsPanel from '../components/dashboard/AIInsightsPanel';
import EarthsMeter from '../components/dashboard/EarthsMeter';
import ClimateTimeMachine from '../components/dashboard/ClimateTimeMachine';
import ShareCard from '../components/share/ShareCard';

export default function DashboardPage() {
  const { twinGenerated, results } = useTwin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!twinGenerated) {
      navigate('/create');
    }
  }, [twinGenerated, navigate]);

  if (!twinGenerated || !results) return null;

  return (
    <PageWrapper>
      <div className="bg-radial-glow min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 space-y-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Environmental Dashboard
            </h1>
            <p className="text-slate-400">
              Your complete environmental profile and insights.
            </p>
          </div>

          {/* Summary Cards */}
          <SummaryCards results={results} />

          {/* Twin Profile & Doppelgänger */}
          <TwinProfile results={results} />

          {/* Charts */}
          <EmissionsBreakdown results={results} />

          {/* Two Column: AI + Earths */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AIInsightsPanel />
            <EarthsMeter earthsNeeded={results.earthsNeeded} />
          </div>

          {/* Climate Time Machine */}
          <ClimateTimeMachine results={results} />

          {/* Share Card */}
          <ShareCard />
        </div>
      </div>
    </PageWrapper>
  );
}
