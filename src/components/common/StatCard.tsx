import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: 'blue' | 'emerald' | 'amber';
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color }) => {
  const colors: Record<'blue' | 'emerald' | 'amber', string> = {
    blue: 'bg-blue-50 text-blue-600 shadow-blue-50',
    emerald: 'bg-emerald-50 text-emerald-600 shadow-emerald-50',
    amber: 'bg-amber-50 text-amber-600 shadow-amber-50',
  };
  
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-5 transition-transform hover:-translate-y-1 cursor-default">
      <div className={`p-4 rounded-3xl ${colors[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
      </div>
    </div>
  );
};
