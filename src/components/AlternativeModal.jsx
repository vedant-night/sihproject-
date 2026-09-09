import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import OffbeatCard from './OffbeatCard';

const AlternativeModal = ({ setBookingOpen }) => {
  const { selectedDestination, recommendations } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (selectedDestination?.zone === 'RED' && !dismissed && recommendations?.recommendations?.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [selectedDestination, dismissed, recommendations]);

  // Reset dismissed state when selecting a new destination
  useEffect(() => {
    setDismissed(false);
  }, [selectedDestination?.id]);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-opacity">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-slate-800 bg-rose-500/10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">⚠️</span>
            <h2 className="text-lg font-bold text-rose-400">High Congestion Alert!</h2>
          </div>
          <p className="text-sm text-slate-300">
            <strong className="text-white">{selectedDestination?.name}</strong> is currently overcrowded. 
            Discover these amazing hidden gems nearby instead!
          </p>
        </div>
        
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations?.recommendations?.slice(0, 4).map(rec => (
              <OffbeatCard key={rec.id} recommendation={rec} setBookingOpen={(val) => {
                setIsVisible(false);
                setBookingOpen(val);
              }} />
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
          <button 
            onClick={() => setDismissed(true)}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlternativeModal;
