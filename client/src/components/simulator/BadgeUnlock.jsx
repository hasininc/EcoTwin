import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BadgeUnlock({ badges, newlyUnlocked }) {
  const [showPopup, setShowPopup] = useState(false);
  const [currentBadge, setCurrentBadge] = useState(null);

  useEffect(() => {
    if (newlyUnlocked) {
      setCurrentBadge(newlyUnlocked);
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [newlyUnlocked]);

  return (
    <AnimatePresence>
      {showPopup && currentBadge && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-4 bg-gradient-to-r from-emerald-900/90 to-teal-900/90 border border-emerald-500/30 backdrop-blur-md p-4 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)]"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-20 rounded-full"
            />
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center relative z-10 border border-emerald-400/50">
              {(() => {
                const Icon = Icons[currentBadge.icon] || Icons.Award;
                return <Icon size={24} className="text-emerald-400" />;
              })()}
            </div>
          </div>
          
          <div>
            <p className="text-xs text-emerald-400 uppercase font-bold tracking-widest mb-0.5">
              Badge Unlocked!
            </p>
            <h4 className="text-white font-semibold">{currentBadge.name}</h4>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
