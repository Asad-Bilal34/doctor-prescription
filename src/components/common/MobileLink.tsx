import React from 'react';

interface MobileLinkProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export const MobileLink: React.FC<MobileLinkProps> = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 ${active ? 'text-blue-600' : 'text-slate-400'}`}>
    {icon} <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
  </button>
);
