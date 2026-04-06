import React from 'react';

export interface Patient {
  id: string;
  name: string;
  age: string;
  sex: string;
  mobile: string;
  date: string;
  complaints: string;
  diseases: {
    hypertension: boolean;
    diabetesMellitus: boolean;
    hepatitisB: boolean;
    hepatitisC: boolean;
  };
  advice: string;
  treatment: string;
}

export interface ClinicConfig {
  drNameEn: string;
  drDegreesEn: string;
  drNameUr: string;
  drDegreesUr: string;
  clinicName: string;
  clinicAddress: string;
  clinicContact: string;
  logo: string | null;
}

interface PrescriptionA4Props {
  config: ClinicConfig;
  data: Patient;
}

export const PrescriptionA4: React.FC<PrescriptionA4Props> = ({ config, data }) => {
  return (
    <div className="prescription-a4 bg-white h-[297mm] w-full max-w-[210mm] mx-auto shadow-2xl flex flex-col text-slate-800" style={{ fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        @media print {
          @page { margin: 0 !important; size: A4 portrait; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          html, body { margin: 0 !important; padding: 0 !important; }
          .prescription-a4 { 
            box-shadow: none !important; 
            border: none !important; 
            margin: 0 !important; 
            width: 100vw !important; 
            height: 100vh !important;
            max-width: 100% !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* TOP HEADER - Navy Blue with Urdu Text */}
      <div className="relative bg-white border-b-4 border-blue-900 px-8 py-4">
        {/* Horizontal Lines */}
        <div className="absolute top-6 left-8 w-32 space-y-1">
          {[...Array(5)].map((_, i) => <div key={i} className="h-0.5 bg-blue-900"></div>)}
        </div>
        <div className="absolute top-6 right-8 w-32 space-y-1">
          {[...Array(5)].map((_, i) => <div key={i} className="h-0.5 bg-blue-900"></div>)}
        </div>
        {/* Center Navy Box with Urdu */}
        <div className="bg-blue-900 text-white text-center py-3 mx-auto" style={{ width: '60%' }}>
          <h1 className="text-2xl font-bold urdu-text" dir="rtl">{config.clinicName}</h1>
        </div>
      </div>

      {/* DOCTOR INFO SECTION */}
      <div className="bg-white px-8 py-5 border-b border-slate-800">
        <div className="flex items-center justify-between gap-6">
          {/* Left: English Info */}
          <div className="text-left flex-1">
            <h2 className="text-[32px] font-bold text-blue-900 mb-2 leading-none">{config.drNameEn}</h2>
            <p className="text-[12px] font-bold text-blue-900 leading-[1.6] whitespace-pre-line">
              {config.drDegreesEn}
            </p>
          </div>
          
          {/* Center: Logo */}
          <div className="flex flex-col items-center justify-center">
            {config.logo ? (
              <img src={config.logo} alt="Clinic Logo" className="w-20 h-20 object-contain" />
            ) : (
              <div className="relative">
                {/* Tooth Logo Circle */}
                <div className="w-20 h-20 rounded-full border-[3px] border-blue-900 flex items-center justify-center bg-white relative z-10">
                  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="white" stroke="#1e3a8a" strokeWidth="2">
                    <path d="M12 3c-1.5 0-3 .5-3.5 2-.3.8-.5 2-.5 3v6c0 1.5.5 3 1 4s1.5 2 2 2.5c.3.3.7.5 1 .5s.7-.2 1-.5c.5-.5 1.5-1.5 2-2.5s1-2.5 1-4V8c0-1-.2-2.2-.5-3-.5-1.5-2-2-3.5-2z" fill="white" stroke="#1e3a8a"/>
                  </svg>
                </div>
                {/* Orange Arc - Right Side */}
                <div className="absolute top-0 right-0 w-20 h-20">
                  <svg className="w-20 h-20" viewBox="0 0 100 100">
                    <path d="M 50 6 A 44 44 0 0 1 94 50 A 44 44 0 0 1 50 94" fill="none" stroke="#f97316" strokeWidth="6"/>
                  </svg>
                </div>
              </div>
            )}
            <div className="text-center mt-1">
              <p className="text-[10px] font-bold text-blue-900 leading-tight">AHMAD BILAL</p>
              <p className="text-[9px] font-semibold text-blue-900">DENTAL CLINIC</p>
            </div>
          </div>
          
          {/* Right: Urdu Info */}
          <div className="text-right urdu-text flex-1" dir="rtl">
            <h2 className="text-[32px] font-bold text-blue-900 mb-2 leading-none">{config.drNameUr}</h2>
            <p className="text-[12px] font-bold text-blue-900 leading-[2.3] whitespace-pre-line">
              {config.drDegreesUr}
            </p>
          </div>
        </div>
        <p className="text-center text-lg font-bold text-blue-900 mt-2">Cell No:{config.clinicContact}</p>
      </div>

      {/* PATIENT INFO BAR */}
      <div className="bg-white px-8 py-3 border-b border-slate-400">
        <div className="grid grid-cols-5 gap-4 text-sm">
          <div className="flex items-center">
            <span className="font-bold text-blue-900 italic">Name:</span>
            <span className="ml-2 border-b border-dotted border-blue-900 flex-1">{data.name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-blue-900 italic">Age:</span>
            <span className="ml-2 border-b border-dotted border-blue-900 flex-1">{data.age}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-blue-900 italic">Sex:</span>
            <span className="ml-2 border-b border-dotted border-blue-900 flex-1">{data.sex}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-blue-900 italic">Date:</span>
            <span className="ml-2 border-b border-dotted border-blue-900 flex-1">{data.date}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-blue-900 italic">Mobile:</span>
            <span className="ml-2 border-b border-dotted border-blue-900 flex-1">{data.mobile}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT - 3 COLUMNS */}
      <div className="flex-1 flex">
        {/* LEFT COLUMN: Presenting Complaint & Diseases */}
        <div className="w-1/4 border-r-2 border-blue-900 px-4 py-6">
          <div className="mb-8">
            <h4 className="text-sm font-bold text-blue-900 mb-3">Presenting Complaint:</h4>
            <div className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed min-h-[200px]">
              {data.complaints || ''}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="text-sm font-bold text-blue-900">Hypertension</span>
              <span className="ml-2 border-b border-blue-900 flex-1"></span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-bold text-blue-900">Diabetes Mellitus</span>
              <span className="ml-2 border-b border-blue-900 flex-1"></span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-bold text-blue-900">Hepatitis B</span>
              <span className="ml-2 border-b border-blue-900 flex-1"></span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-bold text-blue-900">Hepatitis C</span>
              <span className="ml-2 border-b border-blue-900 flex-1"></span>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Rx */}
        <div className="w-1/2 border-r-2 border-blue-900 px-8 py-6 flex flex-col">
          <div className="text-6xl font-bold text-blue-900 italic mb-8">Rx.</div>
          <div className="flex-1"></div>
          
          {/* Bottom Appointment Info */}
          <div className="border-t-2 border-blue-900 pt-3">
            <p className="text-sm font-bold text-blue-900 italic">For Appointment:</p>
            <p className="text-xl font-bold text-blue-900">0300-7311435</p>
            <p className="text-xs font-semibold text-blue-900 urdu-text" dir="rtl">کلینک آنے سے پہلے اس نمبر پر رابطہ کریں۔</p>
          </div>
        </div>

        {/* RIGHT COLUMN: Advice & Treatment */}
        <div className="w-1/4 px-4 py-6 flex flex-col">
          <div className="mb-8">
            <h4 className="text-sm font-bold text-blue-900 mb-3">Advice:</h4>
            <div className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed min-h-[150px]">
              {data.advice || ''}
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-sm font-bold text-blue-900 mb-3">Treatment:</h4>
            <div className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
              {data.treatment || ''}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-white border-t-4 border-blue-900 px-8 py-3 text-center">
        <p className="text-sm font-bold text-blue-900 urdu-text" dir="rtl">
          {config.clinicAddress}
        </p>
      </div>
    </div>
  );
};
