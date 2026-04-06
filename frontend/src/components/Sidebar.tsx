import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Plus, History, Settings, LogOut } from 'lucide-react';
import { SidebarLink } from './common/SidebarLink';
import { useNavigate } from 'react-router-dom';
import { CONFIG_KEY } from '../types';

interface SidebarProps {
  active: 'dashboard' | 'new' | 'history' | 'settings';
  onNavigate: (view: 'dashboard' | 'new' | 'history' | 'settings') => void;
  onResetForm: () => void;
  user?: any;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ active, onNavigate, onResetForm, onLogout }) => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    const savedConfig = localStorage.getItem(CONFIG_KEY);
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        setLogo(config.logo);
      } catch {}
    }
  }, []);

  const handleNewPrescription = () => {
    // prevent navigation for unapproved users
    // @ts-ignore
    const stored = localStorage.getItem('auth');
    let approved = true;
    if (stored) {
      try {
        const { user } = JSON.parse(stored);
        approved = user?.approved !== false;
      } catch {}
    }
    if (!approved) {
      alert('Your account is pending approval by admin.');
      return;
    }
    onResetForm();
    onNavigate('new');
  };
 

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 no-print">
      <div className="flex items-center gap-3 mb-10">
        {logo && (
          <div className="flex items-center justify-center border-2 border-blue-900 rounded-lg p-1">
            <img src={logo} alt="Clinic Logo" className="w-8 h-8 object-contain" />
          </div>
        )}
        <span className="font-black text-xl tracking-tighter text-blue-900">Ahmad Dental</span>
      </div>

      <nav className="flex-1 space-y-2">
        <SidebarLink 
          active={active === 'dashboard'} 
          onClick={() => onNavigate('dashboard')} 
          icon={<LayoutDashboard size={20}/>} 
          label="Dashboard" 
        />
        <SidebarLink 
          active={active === 'new'} 
          onClick={handleNewPrescription} 
          icon={<Plus size={20}/>} 
          label="New Prescription" 
        />
        <SidebarLink 
          active={active === 'history'} 
          onClick={() => onNavigate('history')} 
          icon={<History size={20}/>} 
          label="Patient History" 
        />
        <SidebarLink 
          active={active === 'settings'} 
          onClick={() => onNavigate('settings')} 
          icon={<Settings size={20}/>} 
          label="Clinic Settings" 
        />
      </nav>

      <div className="pt-6 border-t border-slate-100">
        <button
          onClick={() => {
            if (confirm('Are you sure you want to logout?')) {
              onLogout();
              navigate('/login');
            }
          }}
          className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-red-500 transition-colors font-medium"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};
