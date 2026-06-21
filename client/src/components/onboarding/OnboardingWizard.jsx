import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTwin } from '../../context/TwinContext';
import { Button } from '../shared/UIComponents';
import TransportStep from './TransportStep';
import EnergyStep from './EnergyStep';
import FoodStep from './FoodStep';
import ShoppingStep from './ShoppingStep';
import TravelStep from './TravelStep';
import GenerateStep from './GenerateStep';

const STEPS = [
  { id: 'transport', label: 'Transportation', component: TransportStep },
  { id: 'energy', label: 'Home Energy', component: EnergyStep },
  { id: 'food', label: 'Food Habits', component: FoodStep },
  { id: 'shopping', label: 'Shopping', component: ShoppingStep },
  { id: 'travel', label: 'Travel', component: TravelStep },
  { id: 'generate', label: 'Generate Twin', component: GenerateStep },
];

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const { isGenerating } = useTwin();
  const navigate = useNavigate();

  const StepComponent = STEPS[currentStep].component;
  const isLastStep = currentStep === STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  const goNext = () => {
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  };

  const goBack = () => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-[85vh] flex flex-col">
      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-400">
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <span className="text-sm font-medium text-emerald-400">
            {STEPS[currentStep].label}
          </span>
        </div>

        <div className="flex gap-2">
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              className="flex-1 h-1.5 rounded-full overflow-hidden bg-slate-800"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: i <= currentStep ? '100%' : '0%' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <StepComponent onNext={goNext} onNavigate={navigate} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      {!isLastStep && (
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 pb-8">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={isFirstStep}
              icon={ArrowLeft}
            >
              Back
            </Button>
            <Button
              variant="primary"
              onClick={goNext}
              icon={ArrowRight}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
