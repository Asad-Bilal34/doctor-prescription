import React from 'react';
import { Phone, Image as ImageIcon } from 'lucide-react';

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
    <div className="prescription-a4 bg-white h-[297mm] w-full max-w-[210mm] mx-auto border border-slate-300 shadow-2xl flex flex-col text-slate-800 relative overflow-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .prescription-a4 { box-shadow: none; border: none; margin: 0; height: 297mm !important; width: 210mm !important; position: absolute; top: 0; left: 0; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white px-6 py-3 border-b-4 border-blue-400 flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-xl font-black tracking-widest ">{config.clinicName}</h1>
        </div>
        {config.logo && <img src={config.logo} className="h-12 w-12 object-contain" alt="Logo" />}
      </div>

      {/* DOCTOR INFO SECTION */}
      <div className="bg-slate-50 px-6 py-2 border-b-2 border-blue-400">
        <div className="grid grid-cols-2 gap-8">
          {/* Left: English */}
          <div>
            <h2 className="text-lg font-black text-slate-900">Dr. {config.drNameEn}</h2>
            <p className="text-[10px] font-bold text-slate-600 whitespace-pre-wrap leading-tight">{config.drDegreesEn}</p>
          </div>
          {/* Right: Urdu */}
          <div className="text-right urdu-text" dir="rtl">
            <h2 className="text-lg font-black text-slate-900">{config.drNameUr}</h2>
            <p className="text-[10px] font-bold text-slate-600 whitespace-pre-wrap leading-tight">{config.drDegreesUr}</p>
          </div>
        </div>
        <p className="text-[10px] font-bold text-slate-700 text-center mt-1">Cell: {config.clinicContact} </p>
      </div>

      {/* PATIENT INFO BAR */}
      <div className="bg-white px-6 py-2 border-b border-slate-300 flex justify-between text-[11px] font-bold">
        <div><span className="text-slate-500">Name:</span> <span className="text-slate-900 border-b border-dotted border-slate-400 ml-1">{data.name}</span></div>
        <div><span className="text-slate-500">Age:</span> <span className="text-slate-900 border-b border-dotted border-slate-400 ml-1">{data.age}</span></div>
        <div><span className="text-slate-500">Sex:</span> <span className="text-slate-900 border-b border-dotted border-slate-400 ml-1">{data.sex}</span></div>
        <div><span className="text-slate-500">Date:</span> <span className="text-slate-900 border-b border-dotted border-slate-400 ml-1">{data.date}</span></div>
        <div><span className="text-slate-500">Mobile:</span> <span className="text-slate-900 border-b border-dotted border-slate-400 ml-1">{data.mobile}</span></div>
      </div>

      {/* MAIN CONTENT - 3 COLUMNS */}
      <div className="flex-1 flex border-t-2 border-slate-400">
        {/* COLUMN 1: PRESENTING COMPLAINT & DISEASES (25%) */}
        <div className="w-1/4 border-r-2 border-slate-400 px-4 py-4 flex flex-col">
          {/* Presenting Complaint */}
          <div className="mb-7">
            <h4 className="text-[11px] font-black text-blue-700 mb-2">Presenting Complaint:</h4>
            <div className="text-[10px] text-slate-800 whitespace-pre-wrap leading-relaxed min-h-[80px]">
              {data.advice ? data.advice.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              )) : (
                <>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                </>
              )}
            </div>
          </div>

          {/* Treatment/Medications */}
          <div className="flex-1 ">
            <h4 className="text-[11px] font-black text-blue-700 mb-3">HyperTension_____</h4>
            <h4 className="text-[11px] font-black text-blue-700 mb-3">Diabetes Mellitus___</h4>
            <h4 className="text-[11px] font-black text-blue-700 mb-3">Hepatitis B_____</h4>
            <h4 className="text-[11px] font-black text-blue-700 mb-3">Hepatitis C_____</h4>
            
          </div>
        </div>

        {/* COLUMN 2: RX LARGE SPACE (50%) */}
        <div className="w-1/2 border-r-2 border-slate-400 px-7 py-4 flex flex-col ">
          <div className="text-5xl font-black text-blue-900 italic  mt-4">Rx.</div>
          <div className="flex-1 w-full flex flex-col justify-around">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="min-h-[25px]">&nbsp;</div>
            ))}
          </div>
          {/* Signature */}
          <div className="border-t-2 border-slate-400  ">
            
            <span className="text-[9px] font-black text-blue-700">For Appointment:</span><br />
            <span className="text-[9px] font-black text-blue-700">03007311425</span>
            <span className="text-[9px] font-black text-blue-700 px-3">کلینک آنے سے پہلے اس نمبر پر رابطہ کریں۔</span>
          </div>
        </div>

        {/* COLUMN 3: ADVICE & TREATMENT (25%) */}
        <div className="w-1/4 px-3 py-5 flex flex-col">
          {/* Advice */}
          <div className="mb-7">
            <h4 className="text-[11px] font-black text-blue-700 mb-2">Advice:</h4>
            <div className="text-[10px] text-slate-800 whitespace-pre-wrap leading-relaxed min-h-[80px]">
              {data.advice ? data.advice.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              )) : (
                <>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                </>
              )}
            </div>
          </div>

          {/* Treatment/Medications */}
          <div className="flex-1">
            <h4 className="text-[11px] font-black text-blue-700 mb-2">Treatment:</h4>
            <div className="text-[10px] text-slate-800 whitespace-pre-wrap leading-relaxed min-h-[120px]">
              {data.treatment ? data.treatment.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              )) : (
                <>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                  <div>&nbsp;</div>
                </>
              )}
            </div>
          </div>

          {/* Signature */}
          <div className="border-t-2 border-slate-400 pt-3 mt-4 text-center">
            <div className="h-8"></div>
            <span className="text-[9px] font-black text-blue-700">Doctor Signature</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-slate-900 text-white px-6 py-2 text-[9px] font-bold text-center border-t-4 border-blue-400">
        <p className="text-[16px] text-slate-300">Nzd Sarkari Hospital(RHC)Bilmukabil gu petrol pump rohellan wali</p>
      </div>
    </div>
  );
};
