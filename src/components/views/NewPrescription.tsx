import React from 'react';
import { FileText, Save, Printer, AlertCircle } from 'lucide-react';
import { InputField } from '../common/InputField';

import { Checkbox } from '../common/Checkbox';
import { PrescriptionA4, Patient, ClinicConfig } from '../PrescriptionA4';

interface NewPrescriptionProps {
  config: ClinicConfig;
  formState: Patient;
  validationError: string | null;
  onFormChange: (field: keyof Patient, value: any) => void;
  onDiseaseChange: (disease: keyof Patient['diseases'], value: boolean) => void;
  onSave: () => void;
  onPrint: () => void;
}

export const NewPrescription: React.FC<NewPrescriptionProps> = ({
  config,
  formState,
  validationError,
  onFormChange,
  onDiseaseChange,
  onSave,
  onPrint
}) => {
  return (
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10 print:block">
      {/* Form Section */}
      <div className="space-y-6 no-print">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-black text-xl flex items-center gap-2">
            <FileText className="text-blue-600" />
            {formState.id ? 'Edit Prescription' : 'New Prescription'}
          </h2>
          <div className="flex gap-2">
            <button onClick={onSave} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-100">
              <Save size={18} /> Save
            </button>
            <button onClick={onPrint} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-100">
              <Printer size={18} /> Print
            </button>
          </div>
        </div>

        {validationError && (
          <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-600 flex items-center gap-3 font-medium text-sm animate-pulse">
            <AlertCircle size={20} /> {validationError}
          </div>
        )}

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-6">
          <section>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField 
                label="Patient Name *" 
                value={formState.name} 
                onChange={v => onFormChange('name', v)} 
                placeholder="Full Name" 
              />
              <InputField 
                label="Mobile Number *" 
                value={formState.mobile} 
                onChange={v => onFormChange('mobile', v)} 
                placeholder="03xx-xxxxxxx" 
              />
              <div className="grid grid-cols-3 gap-4 md:col-span-2">
                <InputField 
                  label="Age" 
                  value={formState.age} 
                  onChange={v => onFormChange('age', v)} 
                  placeholder="Years" 
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sex</label>
                  <select 
                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700 appearance-none"
                    value={formState.sex}
                    onChange={e => onFormChange('sex', e.target.value)}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <InputField 
                  type="date" 
                  label="Visit Date *" 
                  value={formState.date} 
                  onChange={v => onFormChange('date', v)} 
                />
              </div>
            </div>
          </section>

          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-50">
            <section className="space-y-4">
              <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest">Clinical Notes</h3>
              <Textarea 
                label="Presenting Complaints" 
                value={formState.complaints} 
                onChange={v => onFormChange('complaints', v)} 
                placeholder="Describe symptoms and duration..." 
                rows={4} 
              />
              
              <div className="p-4 bg-slate-50 rounded-2xl space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">History / Pre-existing Diseases</p>
                <div className="grid grid-cols-1 gap-2">
                  <Checkbox 
                    label="Hypertension" 
                    checked={formState.diseases.hypertension} 
                    onChange={v => onDiseaseChange('hypertension', v)} 
                  />
                  <Checkbox 
                    label="Diabetes Mellitus" 
                    checked={formState.diseases.diabetesMellitus} 
                    onChange={v => onDiseaseChange('diabetesMellitus', v)} 
                  />
                  <Checkbox 
                    label="Hepatitis B" 
                    checked={formState.diseases.hepatitisB} 
                    onChange={v => onDiseaseChange('hepatitisB', v)} 
                  />
                  <Checkbox 
                    label="Hepatitis C" 
                    checked={formState.diseases.hepatitisC} 
                    onChange={v => onDiseaseChange('hepatitisC', v)} 
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-xs font-black text-emerald-600 uppercase tracking-widest">Plan & RX</h3>
              <Textarea 
                label="General Advice" 
                value={formState.advice} 
                onChange={v => onFormChange('advice', v)} 
                placeholder="Lifestyle changes, diet, etc..." 
                rows={4} 
              />
              <Textarea 
                label="Treatment (Medication)" 
                value={formState.treatment} 
                onChange={v => onFormChange('treatment', v)} 
                placeholder="Medicine name, dosage, timing..." 
                rows={8} 
              />
            </section>
          </div> */}
        </div>
      </div>

      {/* Preview Section */}
      <div className="print:m-0 print:p-0">
        <PrescriptionA4 config={config} data={formState} />
      </div>
    </div>
  );
};
