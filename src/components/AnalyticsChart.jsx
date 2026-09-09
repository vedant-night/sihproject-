import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../context/AppContext';

const AnalyticsChart = () => {
  const { forecast, selectedDestination } = useAppContext();

  if (!forecast || !forecast.forecast || !selectedDestination) return null;

  const data = forecast.forecast.map(f => ({
    time: `${f.hour}:00`,
    footfall: f.predicted_footfall,
    capacity: f.capacity,
    zone: f.zone
  }));

  const maxCapacity = selectedDestination.max_capacity;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { footfall, zone } = payload[0].payload;
      return (
        <div className="bg-slate-800 border border-slate-700 p-2 rounded shadow-lg text-xs">
          <p className="text-slate-300 font-semibold mb-1">{label}</p>
          <p className="text-white">Footfall: <span className="font-mono">{Math.round(footfall)}</span></p>
          <p className="text-slate-400">Zone: <span className={zone === 'RED' ? 'text-rose-400' : zone === 'YELLOW' ? 'text-amber-400' : 'text-emerald-400'}>{zone}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-48 bg-slate-900 rounded-xl flex flex-col">
      <h3 className="text-sm font-semibold text-slate-300 mb-2 truncate">
        {selectedDestination.name} — 24h Crowd Forecast
      </h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorFootfall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={maxCapacity} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Capacity', fill: '#ef4444', fontSize: 10 }} />
            <Area type="monotone" dataKey="footfall" stroke="#10b981" fillOpacity={1} fill="url(#colorFootfall)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
