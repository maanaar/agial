import React from 'react';
import { Plus, ChevronRight, FileText } from 'lucide-react';

// Components
import VitalsCard from '../../components/patient-summary/VitalsCard';
import DiagnosesCard from '../../components/patient-summary/DiagnosesCard';
import MedicationsCard from '../../components/patient-summary/MedicationsCard';
import DiagnosticsCard from '../../components/patient-summary/DiagnosticsCard';
import VisitsCard from '../../components/patient-summary/VisitsCard';
import AllergiesCard from '../../components/patient-summary/AllergiesCard';

const PatientSummary = ({ data }) => {
  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#F6F6F6] p-6 lg:p-8 font-sans text-gray-900">
      <div className="max-w-[1280px] mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>{data.breadcrumb?.category || 'Internal Medicine'}</span>
          <ChevronRight size={14} />
          <span className="text-gray-400">{data.breadcrumb?.page || 'Medical Desktop'}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">{data.title || 'Patient Summary'}</h1>
          <button className="flex items-center gap-2 bg-[#1E6B7A] hover:bg-[#16505C] text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md active:scale-95">
            <Plus size={18} />
            <span>New Consultation</span>
          </button>
        </div>

        {/* Important Clinical Notes */}
        {data.clinicalNotes && (
          <div className="bg-[#FFF9E6] border border-[#FFE8A3] rounded-xl p-4 mb-8 flex gap-3 shadow-sm">
            <div className="text-yellow-600 mt-1">
              <FileText size={20} fill="currentColor" fillOpacity={0.2} />
            </div>
            <div>
              <h4 className="font-bold text-[#856404] text-sm mb-1">Important Clinical Notes</h4>
              <p className="text-[#856404] text-sm opacity-90 leading-relaxed">
                {data.clinicalNotes}
              </p>
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VitalsCard vitals={data.vitals} />
          <DiagnosesCard diagnoses={data.diagnoses} />
          <MedicationsCard medications={data.medications} />
          <DiagnosticsCard diagnostics={data.diagnostics} />
          <VisitsCard visits={data.visits} />
          <AllergiesCard allergies={data.allergies} />
        </div>
      </div>
    </div>
  );
};

export default PatientSummary;
