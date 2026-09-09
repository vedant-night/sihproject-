import React from 'react';
import { useAppContext } from '../context/AppContext';

const OffbeatCard = ({ recommendation, setBookingOpen }) => {
  const { selectDestination } = useAppContext();
  
  const handleExplore = () => {
    selectDestination(recommendation);
  };

  const handleBook = () => {
    selectDestination(recommendation);
    setBookingOpen(true);
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-sm flex flex-col">
      {recommendation.image_url && (
        <img src={recommendation.image_url} alt={recommendation.name} className="w-full h-24 object-cover" />
      )}
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-semibold text-white text-sm truncate pr-2">{recommendation.name}</h4>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
            {recommendation.distance_km} km
          </span>
        </div>
        <p className="text-xs text-slate-400 line-clamp-2 mb-3">{recommendation.description}</p>
        
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
            <span>Crowd Level</span>
            <span>{Math.round(recommendation.congestion_ratio * 100)}%</span>
          </div>
          <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500" 
              style={{ width: `${Math.min(recommendation.congestion_ratio * 100, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleExplore}
            className="flex-1 py-1.5 text-xs font-medium bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
          >
            Explore
          </button>
          <button 
            onClick={handleBook}
            className="flex-1 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded hover:bg-emerald-500 transition-colors"
          >
            Book Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffbeatCard;
