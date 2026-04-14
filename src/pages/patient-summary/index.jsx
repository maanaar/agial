import React, { useState, useEffect } from 'react';
import PatientSummary from './PatientSummary';

const PATIENT_DATA_MOCK = {
  breadcrumb: { category: 'Internal Medicine', page: 'Medical Desktop' },
  title: 'Patient Summary',
  clinicalNotes: 'Monitor BP closely due to previous hypertensive readings. Patient is allergic to Penicillin. Ensure regular follow-ups for medication adjustment.',
  vitals: [
    { label: 'Blood Pressure', value: '142/90', unit: 'mmHg', status: 'High', date: '01 Mar 2026', type: 'pressure' },
    { label: 'Heart Rate', value: '82', unit: 'bpm', status: 'Normal', date: '01 Mar 2026', type: 'heart' },
    { label: 'Temperature', value: '37.1', unit: '°C', status: 'Normal', date: '01 Mar 2026', type: 'temp' },
    { label: 'SpO2', value: '98', unit: '%', status: 'Normal', date: '01 Mar 2026', type: 'wind' }
  ],
  diagnoses: [
    { title: 'Essential (primary) hypertension', icd: 'I10', date: '01 Mar 2026', type: 'chronic' },
    { title: 'Palpitations', icd: 'R00.2', date: '15 Feb 2026', type: 'resolved' }
  ],
  medications: [
    { name: 'Amlodipine 5mg Tablet', instructions: '1 tablet PO once daily', date: '01 Mar 2026', doctor: 'Dr. Ahmed Anwar', status: 'active', iconType: 'percent' },
    { name: 'Vitamin D3 1000 IU Capsule', instructions: '1 capsule PO once daily', date: '10 Jan 2026', doctor: 'Dr. Ahmed Anwar', status: 'active', iconType: 'pill' }
  ],
  diagnostics: [
    { title: 'Comprehensive Metabolic Panel', date: '01 Mar 2026', status: 'pending', type: 'file' },
    { title: 'Electrocardiogram (ECG)', date: '15 Feb 2026', status: 'final', type: 'activity' },
    { title: 'Complete Blood Count (CBC)', date: '10 Jan 2026', status: 'final', type: 'file' }
  ],
  visits: [
    { title: 'Internal Medicine Consultation', doctor: 'Dr. Ahmed Anwar', date: '01 Mar 2026, 09:15 AM', type: 'Outpatient', iconType: 'stethoscope' },
    { title: 'Emergency Admission', doctor: 'Dr. Sarah Mahmoud', date: '15 Feb 2026, 11:30 AM', type: 'Emergency Clinic', iconType: 'ambulance' }
  ],
  allergies: [
    { name: 'Penicillin', reaction: 'Hives, Anaphylaxis', severity: 'High', type: 'drug' },
    { name: 'Latex', reaction: 'Contact Dermatitis', severity: 'Moderate', type: 'environment' }
  ]
};

const PatientSummaryIndex = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setData(PATIENT_DATA_MOCK);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F6F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading patient record...</span>
        </div>
      </div>
    );
  }

  return <PatientSummary data={data} />;
};

export default PatientSummaryIndex;
