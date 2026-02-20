import React from 'react';

interface SidebarLinkProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
  >
    {icon} <span>{label}</span>
  </button>
);
