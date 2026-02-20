import React, { useEffect, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { InputField } from '../common/InputField';
import { Textarea } from '../common/Textarea';
import type { ClinicConfig } from '../PrescriptionA4';
import { useAuth } from '../../hooks/useAuth';

interface UserItem {
  id: string;
  email: string;
  name?: string;
  role: string;
  approved?: boolean;
  createdAt?: string;
}

interface ClinicSettingsProps {
  config: ClinicConfig;
  onConfigChange: (field: keyof ClinicConfig, value: string | null) => void;
  onSaveSettings: () => void;
}

export const ClinicSettings: React.FC<ClinicSettingsProps> = ({
  config,
  onConfigChange,
  onSaveSettings
}) => {
  const { token } = useAuth();
  const [users, setUsers] = useState<UserItem[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const API = (import.meta as any).env.VITE_API_URL || 'http://127.0.0.1:4001';
        const res = await fetch(`${API}/api/users`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (!res.ok) return;
        const j = await res.json();
        setUsers(j.data || []);
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };
    fetchUsers();
  }, [token]);

  const approveUser = async (id: string) => {
    if (!confirm('Approve this user?')) return;
    try {
      const API = (import.meta as any).env.VITE_API_URL || 'http://127.0.0.1:4001';
      const res = await fetch(`${API}/api/users/${id}/approve`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed');
      const j = await res.json();
      setUsers(users.map(u => u.id === id ? { ...u, approved: true } : u));
      alert('User approved');
    } catch (err) {
      alert('Could not approve user');
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      const API = (import.meta as any).env.VITE_API_URL || 'http://127.0.0.1:4001';
      const res = await fetch(`${API}/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed');
      setUsers(users.filter(u => u.id !== id));
      alert('User deleted successfully');
    } catch (err) {
      alert('Could not delete user');
    }
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onConfigChange('logo', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black text-slate-800">Clinic Profile Configuration</h2>
      
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 space-y-10">
        <section className="flex flex-col md:flex-row gap-8 items-start">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Clinic Logo</label>
            <div className="w-32 h-32 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden relative group">
              {config.logo ? (
                <img src={config.logo} className="w-full h-full object-contain" />
              ) : (
                <ImageIcon className="text-slate-300" size={40} />
              )}
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
            {config.logo && (
              <button 
                onClick={() => onConfigChange('logo', null)} 
                className="text-red-500 text-[10px] font-black uppercase tracking-tighter hover:underline"
              >
                Remove Logo
              </button>
            )}
          </div>

          <div className="flex-1 space-y-4">
            <InputField 
              label="Clinic Name" 
              value={config.clinicName} 
              onChange={v => onConfigChange('clinicName', v)} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField 
                label="Contact Numbers" 
                value={config.clinicContact} 
                onChange={v => onConfigChange('clinicContact', v)} 
              />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
          <div className="space-y-5">
            <h4 className="text-sm font-black text-blue-600 uppercase tracking-widest border-b border-blue-50 pb-2">English Branding</h4>
            <InputField 
              label="Doctor Name" 
              value={config.drNameEn} 
              onChange={v => onConfigChange('drNameEn', v)} 
            />
            <Textarea 
              label="Degrees & Qualifications" 
              value={config.drDegreesEn} 
              onChange={v => onConfigChange('drDegreesEn', v)} 
              rows={3} 
            />
          </div>
          <div className="space-y-5">
            <h4 className="text-sm font-black text-emerald-600 uppercase tracking-widest border-b border-emerald-50 pb-2">Urdu Branding</h4>
            <div dir="rtl" className="space-y-5">
              <InputField 
                label="ڈاکٹر کا نام" 
                value={config.drNameUr} 
                onChange={v => onConfigChange('drNameUr', v)} 
              />
              <Textarea 
                label="ڈگری اور القابات" 
                value={config.drDegreesUr} 
                onChange={v => onConfigChange('drDegreesUr', v)} 
                rows={3} 
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <button 
            onClick={onSaveSettings}
            className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black shadow-2xl active:scale-95 transition-all"
          >
            Save Settings
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 space-y-6 mt-8">
        <h3 className="text-lg font-black">User Requests</h3>
        <div className="divide-y divide-slate-100">
          {users.length === 0 && <div className="p-4 text-slate-400">No users found.</div>}
          {users.map(u => (
            <div key={u.id} className="p-4 flex items-center justify-between">
              <div>
                <div className="font-bold">{u.email}</div>
                <div className="text-xs text-slate-400">{u.role} • {u.approved ? 'Approved' : 'Pending'}</div>
              </div>
              <div className="flex items-center gap-2">
                {!u.approved && (
                  <button onClick={() => approveUser(u.id)} className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-600 transition">Approve</button>
                )}
                <button onClick={() => deleteUser(u.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
