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

export type View = 'dashboard' | 'new' | 'history' | 'settings';

export const STORAGE_KEY = 'docscript_data_v1';
export const CONFIG_KEY = 'docscript_config_v1';

export const DEFAULT_CONFIG: ClinicConfig = {
  drNameEn: 'Dr. Ahmed',
  drDegreesEn: 'BDS , RDS(PMDC)\nDental Surgeon & Oral Physician\nEx House Surgeon Nishter Dental Hospital Multan',
  drNameUr: 'ڈاکٹر احمد',
  drDegreesUr: 'بی ڈی ایس, آر ڈی ایس(پی ایم ڈی سی)\nڈینٹل سرجن & اورل فزیشن\nایکس ہاؤس سرجن نشتر ڈینٹل ہسپتال ملتان',
  clinicName: 'AHMAD BILAL DENTAL CLINIC',
  clinicAddress: 'NZD RHC opposite Go pump rohillanwali',
  clinicContact: '0300-7311425',
  logo: null
};

export const DEFAULT_FORM_STATE: Patient = {
  id: '',
  name: '',
  age: '',
  sex: 'Male',
  mobile: '',
  date: new Date().toISOString().split('T')[0],
  complaints: '',
  diseases: { hypertension: false, diabetesMellitus: false, hepatitisB: false, hepatitisC: false },
  advice: '',
  treatment: ''
};
