import React from 'react';
import { Search, Eye, Trash2 } from 'lucide-react';
import type { Patient } from '../PrescriptionA4';

interface PatientHistoryProps {
  patients: Patient[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patientId: string) => void;
}

export const PatientHistory: React.FC<PatientHistoryProps> = ({
  patients,
  searchTerm,
  onSearchChange,
  onEdit,
  onDelete
}) => {
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.mobile.includes(searchTerm)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-slate-800">Patient Records</h2>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or mobile..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Patient Details</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Mobile</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Visit Date</th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredPatients.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800">{p.name}</div>
                  <div className="text-xs text-slate-400 font-medium">{p.age} Y / {p.sex}</div>
                </td>
                <td className="px-6 py-4 text-slate-600 font-medium">{p.mobile}</td>
                <td className="px-6 py-4 text-slate-600 font-medium">{p.date}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button 
                    onClick={() => onEdit(p)} 
                    className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" 
                    title="Edit/View"
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    onClick={() => onDelete(p.id)} 
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredPatients.length === 0 && (
              <tr>
                <td colSpan={4} className="p-12 text-center text-slate-400 font-medium italic">No matching records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
