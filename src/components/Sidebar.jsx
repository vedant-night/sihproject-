import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import AnalyticsChart from './AnalyticsChart';
import OffbeatCard from './OffbeatCard';

const Sidebar = ({ setBookingOpen }) => {
  const { destinations, selectedDestination, selectDestination, recommendations } = useAppContext();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All Spots');

  const filteredDestinations = destinations.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    if (activeTab === 'Offbeat Gems') return matchesSearch && d.type === 'offbeat';
    return matchesSearch;
  });

  const getZoneColor = (zone) => {
    switch (zone) {
      case 'GREEN': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'YELLOW': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'RED': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="w-96 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-800">
        <input 
          type="text" 
          placeholder="Search destinations..." 
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <div className="flex rounded-lg bg-slate-800 p-1">
          {['All Spots', 'Offbeat Gems'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-sm py-1.5 rounded-md transition-colors ${
                activeTab === tab ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredDestinations.map(dest => (
          <div 
            key={dest.id}
            onClick={() => selectDestination(dest)}
            className={`p-3 rounded-xl cursor-pointer border transition-all ${
              selectedDestination?.id === dest.id 
                ? 'bg-slate-800 border-emerald-500 ring-1 ring-emerald-500/50' 
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">{dest.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${getZoneColor(dest.zone)}`}>
                {dest.zone}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded">{dest.category}</span>
              <span className="text-slate-300">
                <span className="font-mono text-emerald-400">{dest.current_footfall}</span> / {dest.max_capacity}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedDestination && (
        <div className="border-t border-slate-800 p-4 bg-slate-900 overflow-y-auto max-h-96">
          <AnalyticsChart />
          {recommendations?.recommendations && recommendations.recommendations.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Suggested Alternatives</h4>
              <div className="space-y-4">
                {recommendations.recommendations.map(rec => (
                  <OffbeatCard key={rec.id} recommendation={rec} setBookingOpen={setBookingOpen} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
