import React from 'react';
import { Plus, User, Calendar, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { Patient, ClinicConfig } from '../PrescriptionA4';

interface DashboardProps {
  config: ClinicConfig;
  patients: Patient[];
  onNewPrescription: () => void;
  onSelectPatient: (patient: Patient) => void;
  onViewHistory: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  config,
  patients,
  onNewPrescription,
  onSelectPatient,
  onViewHistory
}) => {
  const stats = {
    total: patients.length,
    today: patients.filter(p => p.date === new Date().toISOString().split('T')[0]).length,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Welcome, {config.drNameEn.split(' ')[1]}</h1>
          <p className="text-slate-500 font-medium">Here's what's happening today.</p>
        </div>
        <button 
          onClick={onNewPrescription}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-blue-200 active:scale-95"
        >
          <Plus size={20} /> Create New Prescription
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Patients" value={stats.total.toString()} icon={<User className="text-blue-500" />} color="blue" />
        <StatCard label="Visits Today" value={stats.today.toString()} icon={<Calendar className="text-emerald-500" />} color="emerald" />
        <StatCard label="Clinic Status" value="Online" icon={<CheckCircle2 className="text-amber-500" />} color="amber" />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Recent Patient Visits</h2>
          <button onClick={onViewHistory} className="text-blue-600 font-bold text-sm hover:underline">View All Records</button>
        </div>
        <div className="divide-y divide-slate-50">
          {patients.slice(0, 5).map(p => (
            <div key={p.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => onSelectPatient(p)}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl">
                  {p.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{p.name}</h4>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{p.date} • {p.mobile}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
            </div>
          ))}
          {patients.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={24} />
              </div>
              <p className="font-medium">No prescription history found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
