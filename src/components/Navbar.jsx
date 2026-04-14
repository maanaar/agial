import { NavLink } from "react-router-dom";
import { useState, useCallback } from "react";
import { usePatient } from "../context/PatientContext";

const navItems = [
  {
    name: "Consultation Form",
    iconClass: "fa-solid fa-stethoscope",
    path: "/consultationform",
    end: true,
  },
  {
    name: "Medical Record",
    iconClass: "fa-solid fa-file-medical",
    path: "/consultationform/medicalrecord",
  },
  {
    name: "Vital Signs",
    iconClass: "fa-solid fa-file-medical",
    path: "/consultationform/vitalSigns",
  },
  {
    name: "Patient Summary",
    iconClass: "fa-solid fa-user-injured",
    path: "/consultationform/patient-summary",
  },
  {
    name: "Patient Info",
    iconClass: "fa-solid fa-compass",
    path: "/consultationform/Patientinfo",
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);
  const { patient } = usePatient()
  const initials = patient?.name
    ? patient.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?'
  return (
    <>
   
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-50 w-full h-16 bg-white/70 backdrop-blur-md border-b bg-[linear-gradient(-90deg,#FFFFFF_0%,#D9E4EF_90%)] flex items-center justify-between px-4">
        <button
          onClick={toggleMobileMenu}
          className="p-2 text-[#14A3B8] hover:text-[#07626f] transition-colors"
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 z-50
        w-[280px] h-screen
        bg-white/70 backdrop-blur-md border-r
        bg-[linear-gradient(-90deg,#FFFFFF_0%,#D9E4EF_90%)]
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="w-full bg-[linear-gradient(-90deg,#FFFFFF_0%,#D9E4EF_90%)] border border-gray-200 p-4">
        {patient ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-teal-50 flex items-center justify-center text-teal-700 font-medium text-base flex-shrink-0">
                {initials}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-md">{patient.name}</p>
                {patient.nameAr && (
                  <p className="text-base text-gray-500 mt-0.5 text-right" dir="rtl">{patient.nameAr}</p>
                )}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2">
              {[
                { label: 'MRN',          value: patient.mrn },
                { label: 'Gender / Age', value: `${patient.gender ?? '—'}, ${patient.age ?? '—'} Yrs` },
                { label: 'Department',   value: patient.department ?? '—' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-[13px]">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400 italic">No patient selected</p>
        )}
      </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-5 lg:px-6 py-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-[15px] lg:text-[16px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-teal-600 hover:bg-white/50 hover:text-[#07626f]"
                  }`
                }
              >
                <i className={`${item.iconClass} text-[18px]`}></i>
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}