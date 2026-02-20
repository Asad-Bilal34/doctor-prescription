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
  drNameEn: 'Dr. Muhammad Ahmed',
  drDegreesEn: 'MBBS, FCPS (Medicine)\nGeneral Physician & Consultant',
  drNameUr: 'ڈاکٹر محمد احمد',
  drDegreesUr: 'ایم بی بی ایس، ایف سی پی ایس\nماہر امراضِ جگر و معدہ',
  clinicName: 'REHMAN MEDICAL CENTER',
  clinicAddress: 'Plot 45-C, Medical Lane, Phase 5, Karachi',
  clinicContact: '021-34567890 / 0300-1234567',
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
