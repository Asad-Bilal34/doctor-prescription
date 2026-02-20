import React from 'react';
import { Plus } from 'lucide-react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer p-1 group">
    <div 
      onClick={() => onChange(!checked)}
      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-100' : 'border-slate-200 group-hover:border-blue-300'}`}
    >
      {checked && <Plus size={14} className="text-white" />}
    </div>
    <span className={`text-xs font-black uppercase tracking-tighter transition-colors ${checked ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'}`}>{label}</span>
  </label>
);
