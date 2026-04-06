import React from 'react';

interface TextareaProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  rows = 3 
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>}
    <textarea 
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 transition-all placeholder:text-slate-300 placeholder:font-normal resize-none leading-relaxed"
    />
  </div>
);
