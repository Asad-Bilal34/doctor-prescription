import React from 'react';
import { LayoutDashboard, Plus, History, Settings, LogOut } from 'lucide-react';
import { MobileLink } from './common/MobileLink';
import { useNavigate } from 'react-router-dom';

interface MobileNavProps {
  active: 'dashboard' | 'new' | 'history' | 'settings';
  onNavigate: (view: 'dashboard' | 'new' | 'history' | 'settings') => void;
  onResetForm: () => void;
  user?: any;
  onLogout: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ active, onNavigate, onResetForm, onLogout }) => {
  const navigate = useNavigate();
  const handleNewPrescription = () => {
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around p-3 z-50 no-print">
      <MobileLink 
        active={active === 'dashboard'} 
        onClick={() => onNavigate('dashboard')} 
        icon={<LayoutDashboard size={20}/>} 
        label="Home" 
      />
      <MobileLink 
        active={active === 'new'} 
        onClick={handleNewPrescription} 
        icon={<Plus size={20}/>} 
        label="New" 
      />
      <MobileLink 
        active={active === 'history'} 
        onClick={() => onNavigate('history')} 
        icon={<History size={20}/>} 
        label="Records" 
      />
      <MobileLink 
        active={active === 'settings'} 
        onClick={() => onNavigate('settings')} 
        icon={<Settings size={20}/>} 
        label="Settings" 
      />
      <button
        onClick={() => {
          if (confirm('Are you sure you want to logout?')) {
            onLogout();
            navigate('/login');
          }
        }}
        className="flex items-center justify-center text-slate-500"
      >
        <LogOut size={22} />
      </button>
    </nav>
  );
};
