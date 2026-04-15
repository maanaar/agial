import React, { useState, useEffect } from 'react';
import PatientSummary from './PatientSummary';
import { usePatient } from '../../context/PatientContext';

const PatientSummaryIndex = () => {
  const { patient } = usePatient();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patient?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/agial/patient/${patient.id}/summary`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        setData(d || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [patient?.id]);

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

  return <PatientSummary data={data} patient={patient} />;
};

export default PatientSummaryIndex;
