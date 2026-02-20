import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './hooks/ProtectedRoute';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { Dashboard, NewPrescription, PatientHistory, ClinicSettings } from './components/views';
import { Login } from './components/views/Login';
import { Register } from './components/views/Register';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Patient, ClinicConfig, View, STORAGE_KEY, CONFIG_KEY, DEFAULT_CONFIG, DEFAULT_FORM_STATE } from './types';

function MainApp() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [view, setView] = useState<View>('dashboard');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [config, setConfig] = useState<ClinicConfig>(DEFAULT_CONFIG);
  const [searchTerm, setSearchTerm] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [formState, setFormState] = useState<Patient>(DEFAULT_FORM_STATE);

  useEffect(() => {
    const savedPatients = localStorage.getItem(STORAGE_KEY);
    const savedConfig = localStorage.getItem(CONFIG_KEY);
    if (savedPatients) setPatients(JSON.parse(savedPatients));
    if (savedConfig) setConfig(JSON.parse(savedConfig));
    // read optional view from query param (e.g., ?view=new)
    try {
      const params = new URLSearchParams(location.search);
      const q = params.get('view');
      if (q === 'new' || q === 'dashboard' || q === 'history' || q === 'settings') setView(q);
    } catch (err) {}
  }, [location.search]);

  const saveToDB = (updatedPatients: Patient[]) => {
    setPatients(updatedPatients);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPatients));
  };

  const validate = () => {
    if (!formState.name || !formState.mobile || !formState.date) {
      setValidationError("Patient Name, Mobile, and Date are mandatory.");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSave = () => {
    if (!validate()) return;
    const isEdit = !!formState.id;
    const newPatient = { ...formState, id: isEdit ? formState.id : Date.now().toString() };
    
    let updated;
    if (isEdit) {
      updated = patients.map(p => p.id === newPatient.id ? newPatient : p);
    } else {
      updated = [newPatient, ...patients];
    }
    
    saveToDB(updated);
    alert('Prescription saved successfully!');
    if (!isEdit) setView('dashboard');
  };

  const resetForm = () => {
    setFormState(DEFAULT_FORM_STATE);
    setValidationError(null);
  };

  const handleFormChange = (field: keyof Patient, value: any) => {
    if (field === 'diseases') {
      setFormState({ ...formState, diseases: value });
    } else {
      setFormState({ ...formState, [field]: value });
    }
  };

  const handleDiseaseChange = (disease: keyof Patient['diseases'], value: boolean) => {
    setFormState({
      ...formState,
      diseases: { ...formState.diseases, [disease]: value }
    });
  };

  const handleConfigChange = (field: keyof ClinicConfig, value: string | null) => {
    setConfig({ ...config, [field]: value });
  };

  const handleSaveSettings = () => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    alert('Settings updated!');
  };

  const handleDelete = (patientId: string) => {
    if (confirm('Delete this record permanently?')) {
      saveToDB(patients.filter(x => x.id !== patientId));
    }
  };

  const handleSelectPatient = (patient: Patient) => {
    setFormState(patient);
    setView('new');
  };

  const isAdmin = user?.role === 'ADMIN';
  const isApproved = user?.approved !== false; // undefined treated as approved=false conservatively

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
        <Sidebar 
          active={view} 
          onNavigate={setView}
          onResetForm={resetForm}
          user={user}
          onLogout={logout}
        />

      <main className="flex-1 overflow-y-auto p-4 md:p-8 print:p-0 mb-16 md:mb-0">
        {view === 'dashboard' && isAdmin && (
          <Dashboard
            config={config}
            patients={patients}
            onNewPrescription={() => {
              if (!isApproved) return alert('Your account is pending approval by admin.');
              resetForm();
              setView('new');
            }}
            onSelectPatient={handleSelectPatient}
            onViewHistory={() => setView('history')}
          />
        )}

        {view === 'new' && (
          <NewPrescription
            config={config}
            formState={formState}
            validationError={validationError}
            onFormChange={handleFormChange}
            onDiseaseChange={handleDiseaseChange}
            onSave={handleSave}
            onPrint={() => window.print()}
          />
        )}

        {view === 'history' && isAdmin && (
          <PatientHistory
            patients={patients}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onEdit={handleSelectPatient}
            onDelete={handleDelete}
          />
        )}

        {view === 'settings' && isAdmin && (
          <ClinicSettings
            config={config}
            onConfigChange={handleConfigChange}
            onSaveSettings={handleSaveSettings}
          />
        )}

        {!isAdmin && view !== 'new' && (
          <div style={{ padding: '20px' }}>
            <h2>Welcome, {user?.email}</h2>
            <p>You have access to create new prescriptions. Use the navigation to proceed.</p>
          </div>
        )}
      </main>

      <MobileNav
        active={view}
        onNavigate={setView}
        onResetForm={resetForm}
        user={user}
        onLogout={logout}
      />

      <style>{`
        @media print {
          .prescription-a4 {
            width: 210mm;
            min-height: 297mm;
            padding: 15mm;
            margin: 0 auto;
            border: none !important;
            box-shadow: none !important;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1000;
          }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<ProtectedRoute><MainApp /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
