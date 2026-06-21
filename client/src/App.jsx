import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { TwinProvider } from './context/TwinContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import CreatePage from './pages/CreatePage';
import DashboardPage from './pages/DashboardPage';
import SimulatorPage from './pages/SimulatorPage';
import LegacyPage from './pages/LegacyPage';

export default function App() {
  return (
    <BrowserRouter>
      <TwinProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/simulator" element={<SimulatorPage />} />
                <Route path="/legacy" element={<LegacyPage />} />
              </Routes>
            </AnimatePresence>
          </div>
          <Footer />
        </div>
      </TwinProvider>
    </BrowserRouter>
  );
}
