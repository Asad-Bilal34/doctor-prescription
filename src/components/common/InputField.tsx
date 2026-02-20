import React from 'react';

interface InputFieldProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  [key: string]: any;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  ...props 
}) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>}
    <input 
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 transition-all placeholder:text-slate-300 placeholder:font-normal"
      {...props}
    />
  </div>
);
