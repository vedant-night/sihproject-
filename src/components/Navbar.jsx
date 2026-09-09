import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shadow-md z-10">
      <div className="flex items-center gap-3">
        <span className="text-2xl" role="img" aria-label="compass">🧭</span>
        <div>
          <h1 className="text-xl font-bold text-white leading-tight">OffBeat AI</h1>
          <p className="text-xs text-slate-400">Smart Tourist-Flow Balancing Platform</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-medium text-slate-300">Live</span>
        </div>
        <div className="text-sm text-slate-400 font-mono">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
