// import { useState } from "react";

const ChevronDown = () => (
  <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);
const CalIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2} />
    <path strokeLinecap="round" strokeWidth={2} d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);
const PrintIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  </svg>
);
const WristbandIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="4" y="8" width="16" height="8" rx="4" strokeWidth={2} />
    <path strokeLinecap="round" strokeWidth={2} d="M8 12h8" />
  </svg>
);
const QueueIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);
const SwapIcon = () => (
  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);
const ClipIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);
const UploadIcon = () => (
  <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);
const ExternalIcon = () => (
  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);
const ClockIcon = () => (
  <svg className="w-3.5 h-3.5 mr-1 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <path strokeLinecap="round" strokeWidth={2} d="M12 6v6l4 2" />
  </svg>
);
const PersonIcon = () => (
  <svg className="w-3.5 h-3.5 mr-1 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const RefreshIcon = () => (
  <svg className="w-3.5 h-3.5 mr-1 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);
const UserIcon = () => (
  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const SelectField = ({ label, value, hint, required, placeholder }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-xs text-gray-500">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <div className="flex items-center justify-between border border-gray-200 rounded-md bg-white h-9 px-3 cursor-pointer hover:border-gray-300 transition-colors">
      <span className={`text-sm truncate flex-1 ${value ? "text-gray-700" : "text-gray-400"}`}>{value || placeholder}</span>
      <ChevronDown />
    </div>
    {hint && <p className="text-xs text-gray-400 leading-tight">{hint}</p>}
  </div>
);

const InputField = ({ label, value, placeholder, highlight, disabled, required }) => (
  <div className="flex flex-col gap-1">
    {label && label !== " " && (
      <label className="text-xs text-gray-500">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    {label === " " && <label className="text-xs text-gray-500">&nbsp;</label>}
    <input
      className={`border rounded-md h-9 px-3 text-sm outline-none focus:ring-1 focus:ring-teal-400 focus:border-teal-400 transition-colors w-full
        ${highlight ? "border-red-300 bg-red-50 placeholder-red-300" : "border-gray-200 bg-white text-gray-700 placeholder-gray-400"}
        ${disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : ""}`}
      defaultValue={value}
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
);

const DateField = ({ label, value, required }) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label className="text-xs text-gray-500">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <div className="flex items-center border border-gray-200 rounded-md h-9 px-3 bg-white cursor-pointer hover:border-gray-300 transition-colors">
      <CalIcon />
      <span className="text-sm text-gray-700">{value}</span>
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-sm font-semibold text-teal-600 mb-4">{children}</h3>
);

export default function InpatientAdmission() {
  // const [activeTab, setActiveTab] = useState("General Inpatient");
//   const tabs = ["Booking", "OPD", "Emergency", "General Inpatient", "Accounting"];

  return (
    <div className="min-h-screen bg-gray-50 text-sm" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 h-11 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <span className="text-sm font-bold text-teal-600">Agial Hospital HIS</span>
        {/* <div className="flex items-center gap-0.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                activeTab === tab
                  ? "text-teal-600 underline underline-offset-4 decoration-teal-500"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div> */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
            <UserIcon />
          </div>
          <span className="text-xs text-gray-600 font-medium">Hadeer INP Recp</span>
        </div>
      </nav>

      {/* Patient Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <h1 className="text-base font-bold text-gray-800">Rawan Samir Ali Hassan Othman</h1>
              <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">ARRIVED</span>
            </div>
            <div className="flex items-center gap-5 text-xs text-gray-600 mb-1.5">
              <span><span className="text-gray-400 font-semibold mr-1">MRN</span>F-89545</span>
              <span><span className="text-gray-400 font-semibold mr-1">GENDER</span>Female</span>
              <span><span className="text-gray-400 font-semibold mr-1">AGE</span>29</span>
              <span><span className="text-gray-400 font-semibold mr-1">NATIONAL ID</span>29609020202363</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="font-semibold text-gray-400">FOREIGNER</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="text-gray-400">×</span> No
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[
              { icon: <PrintIcon />, label: "Print Admission Form" },
              { icon: <WristbandIcon />, label: "Print Wristband" },
              { icon: <QueueIcon />, label: "Generate Queue" },
            ].map(({ icon, label }) => (
              <button key={label} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 rounded-md bg-white hover:bg-gray-50 text-gray-600 font-medium transition-colors">
                {icon} {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5">

        {/* Page Title */}
        <div className="flex items-center gap-2 mb-5">
          <UserIcon />
          <h2 className="text-lg font-bold text-gray-700">Inpatient Admission / ADT Desktop</h2>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Admission Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <SectionTitle>Admission Summary</SectionTitle>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <SelectField label="Visit Type" value="Inpatient" />
              <DateField label="Admission Date & Time" value="12/04/2026 08:26 AM" />
              <SelectField label="Primary Doctor" value="Dr. Amr Essam El-Din" />
              <SelectField label="Service / Specialty" value="Obstetrics & Gynecology" />
              <SelectField label="Admission Source" value="Walking patient" hint="Select how the patient arrived at the facility." />
              <SelectField label="Payment Type" value="Cash" hint="Select the primary method of payment for this visit." />
            </div>
          </div>

          {/* Patient Demographics */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <SectionTitle>Patient Demographics</SectionTitle>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <InputField label="National ID" placeholder="Enter National ID" highlight required />
              <DateField label="Date of Birth" value="02/09/1996" />
              <InputField label="Age" value="29" disabled />
              <SelectField label="Gender" value="Female" />
              <InputField label="City" value="Alexandria (EG)" />
              <InputField label="Address" value="El-Shatby" />
              <InputField label="Mobile Phone" value="01211983821" />
              <InputField label="Email" value="patient@example.com" />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Accommodation Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-teal-600">Accommodation Details</h3>
              <button className="flex items-center text-xs text-teal-600 hover:text-teal-700 font-medium border border-teal-200 bg-teal-50 rounded-md px-2.5 py-1.5 transition-colors">
                <SwapIcon /> Change Accommodation
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
              <SelectField label="Ward" value="Maternity" />
              <SelectField label="Room" value="Room 104" />
              <SelectField label="Bed" value="Unnamed (1)" />
              <SelectField label="Grade / Class" value="First Class Premium" />
              <SelectField label="Operation Room" placeholder="Select OR..." />
              <SelectField label="Transfer From" value="None" />
            </div>
          </div>

          {/* Family & Contact Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <SectionTitle>Family & Contact Details</SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-100 rounded-md p-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Husband Information</p>
                <div className="flex flex-col gap-3">
                  <InputField label="Husband Name" value="Adel El-Sayed Mahmoud" />
                  <InputField label="Husband National ID" value="29004290200771" />
                  <InputField label="Mobile Number" value="01270355427" />
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-md p-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Emergency Contact</p>
                <div className="flex flex-col gap-3">
                  <InputField label="Relative Name" placeholder="Enter relative name" />
                  <SelectField label="Relation" placeholder="Select relation" />
                  <div className="grid grid-cols-2 gap-2">
                    <InputField label="Mobile Number" placeholder="Phone" />
                    <InputField label=" " placeholder="Address" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial & Services */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
          <SectionTitle>Financial & Services</SectionTitle>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <SelectField label="Insurance Company" value="None (Cash)" />
            <SelectField label="Insurance Plan" value="N/A" />
            <InputField label="Coverage %" value="0%" disabled />
            <InputField label="Co-payment" value="100%" disabled />
          </div>
          <div className="mb-5 max-w-xs">
            <InputField label="Authorization Number" placeholder="Enter Auth No. if applicable" />
          </div>
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Service", "Service Type", "Price", "Discount Type", "Discount Reason", "Discount %", "Discount Amount", "Sub-total", ""].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { service: "C-Section Delivery", type: "Cash", price: "5,600.00", dt: "-", dr: "-", dp: "0.00", da: "0.00", sub: "5,600.00" },
                  { service: "Routine Blood Test", type: "Lab", price: "150.00", dt: "-", dr: "-", dp: "0.00", da: "0.00", sub: "150.00" },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-3 text-xs text-gray-700">{r.service}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{r.type}</td>
                    <td className="px-3 py-3 text-xs text-gray-700">{r.price}</td>
                    <td className="px-3 py-3 text-xs text-gray-400">{r.dt}</td>
                    <td className="px-3 py-3 text-xs text-gray-400">{r.dr}</td>
                    <td className="px-3 py-3 text-xs text-gray-700">{r.dp}</td>
                    <td className="px-3 py-3 text-xs text-gray-700">{r.da}</td>
                    <td className="px-3 py-3 text-xs text-gray-700 font-medium">{r.sub}</td>
                    <td className="px-3 py-3"><button className="text-gray-300 hover:text-red-400 text-base leading-none">×</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-3 py-2.5 border-t border-gray-100">
              <button className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-medium">
                <span className="text-lg leading-none font-light">+</span> Add service line
              </button>
            </div>
          </div>
        </div>

        {/* Attachments & Notes */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
          <SectionTitle>Attachments & Notes</SectionTitle>
          <div className="border border-gray-200 rounded-md overflow-hidden mb-5">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500 w-56">Document Type</th>
                  <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-500">Note</th>
                  <th className="text-right px-3 py-2.5 text-xs font-medium text-gray-500">Attachment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-3 text-xs text-gray-700">Patient ID Scan</td>
                  <td className="px-3 py-3 text-xs text-gray-500">Front and back side of ID</td>
                  <td className="px-3 py-3 text-right"><ClipIcon /></td>
                </tr>
              </tbody>
            </table>
            <div className="px-3 py-2.5 border-t border-gray-100">
              <button className="flex items-center text-xs text-teal-600 hover:text-teal-700 font-medium">
                <UploadIcon /> Upload document
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1.5">Internal Notes</label>
            <textarea
              className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-1 focus:ring-teal-400 focus:border-teal-400 resize-y min-h-[90px] transition-colors"
              placeholder="Add any internal administrative notes here..."
            />
          </div>
        </div>

        {/* Previous Visits */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
          <SectionTitle>Previous Visits</SectionTitle>
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Date", "Department", "Doctor", "Summary", ""].map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-xs font-medium text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { date: "08/04/2026", dept: "OPD", doctor: "Dr. Hesham Gamal Emam", summary: "Routine checkup, labs ordered." },
                  { date: "15/02/2026", dept: "IVF Clinic", doctor: "Dr. Amr Essam El-Din", summary: "Consultation and ultrasound." },
                ].map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-3 py-3 text-xs text-gray-700">{r.date}</td>
                    <td className="px-3 py-3 text-xs text-gray-700">{r.dept}</td>
                    <td className="px-3 py-3 text-xs text-gray-700">{r.doctor}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{r.summary}</td>
                    <td className="px-3 py-3 text-right"><ExternalIcon /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="bg-white border border-gray-200 rounded-lg px-5 py-3 flex items-center justify-between shadow-md sticky bottom-4">
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <span className="flex items-center"><ClockIcon />Created on: 12/04/2026 08:26 AM</span>
            <span className="flex items-center"><PersonIcon />Created by: Hadeer INP Recp</span>
            <span className="flex items-center"><RefreshIcon />Last updated: Just now</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md font-medium transition-colors">Cancel</button>
            <button className="px-4 py-2 text-sm border border-gray-200 bg-white hover:bg-gray-50 rounded-md text-gray-700 font-medium transition-colors">Save Admission</button>
            <button className="px-4 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-md font-semibold transition-colors shadow-sm">Save &amp; Print</button>
          </div>
        </div>

      </div>
    </div>
  );
}