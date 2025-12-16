import React from 'react';
import { EmployeeActivityLog, CitizenReport } from '../types';
import { Activity, AlertCircle } from 'lucide-react';

interface RunningTextProps {
  activities: EmployeeActivityLog[];
  reports: CitizenReport[];
}

export const RunningText: React.FC<RunningTextProps> = ({ activities, reports }) => {
  // Combine top 5 recent activities and top 5 recent reports
  const recentActivities = activities.slice(0, 5).map(a => ({
    type: 'ACTIVITY',
    text: `[KINERJA] ${a.employeeName} (${a.role}): ${a.activity} di ${a.location}`,
    time: a.timestamp
  }));

  const recentReports = reports.slice(0, 5).map(r => ({
    type: 'REPORT',
    text: `[WARGA] Laporan Baru: ${r.category} di ${r.location} - "${r.summary}"`,
    time: r.timestamp
  }));

  // Merge and sort by time
  const tickerItems = [...recentActivities, ...recentReports].sort((a, b) => b.time.getTime() - a.time.getTime());

  return (
    <div className="bg-slate-900 text-white h-10 flex items-center overflow-hidden relative z-20 border-b border-slate-700 shadow-md">
      <div className="bg-blue-600 h-full px-4 flex items-center justify-center font-bold text-xs uppercase tracking-wider shadow-lg z-10 shrink-0">
        <Activity size={14} className="mr-2 animate-pulse" />
        Live Update
      </div>
      
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        {/* Container for animation */}
        <div className="whitespace-nowrap animate-marquee flex items-center">
          {tickerItems.map((item, index) => (
            <span key={index} className="inline-flex items-center mx-8 text-xs font-medium tracking-wide">
              <span className={`w-2 h-2 rounded-full mr-2 ${item.type === 'REPORT' ? 'bg-orange-500' : 'bg-green-500'}`}></span>
              <span className="text-slate-400 mr-2 font-mono">
                {item.time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className={item.type === 'REPORT' ? 'text-orange-200' : 'text-slate-200'}>
                {item.text}
              </span>
            </span>
          ))}
          {/* Duplicate for seamless loop effect (optional simple version) */}
          {tickerItems.map((item, index) => (
            <span key={`dup-${index}`} className="inline-flex items-center mx-8 text-xs font-medium tracking-wide">
              <span className={`w-2 h-2 rounded-full mr-2 ${item.type === 'REPORT' ? 'bg-orange-500' : 'bg-green-500'}`}></span>
              <span className="text-slate-400 mr-2 font-mono">
                {item.time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className={item.type === 'REPORT' ? 'text-orange-200' : 'text-slate-200'}>
                {item.text}
              </span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};