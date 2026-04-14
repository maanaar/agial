// Patient Summary — fully Tailwind CSS
// Requires: Tailwind CSS v3+ configured in your project
 import { TriangleAlert } from 'lucide-react';
 import { User } from 'lucide-react';
 import { Stethoscope } from 'lucide-react';
 import { Activity } from 'lucide-react';
 import {  History, Paperclip} from 'lucide-react';
 import { Pill } from 'lucide-react';
 import { FileUser } from 'lucide-react';

/* ── Top Nav ── */
function TopNav() {
  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-6 h-13 flex items-center gap-2 text-sm text-gray-500 sticky top-0 z-10">
      <span className="text-gray-500">Internal Medicine</span>
      <span className="text-gray-300">›</span>
      <span className="text-gray-900 font-medium">Medical Desktop</span>
    </nav>
  );
}
 
/* ── Page Header ── */
function PageHeader() {
  return (
    <div className="bg-white  border-b border-gray-200 px-6 py-5">
         <h1 className="text-2xl font-semibold text-slate-900 tracking-tight mb-1">
        Patient Info
      </h1>
        <div className="flex justify-between ">

      <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
        A unified clinical overview combining consultation, medications, vitals,
        diagnostic requests, and recent visit history for quick doctor review.
      </p>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <div className="flex items-center gap-2 bg-slate-50 border ms-5 border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-[350px] max-w-xs">
          <span className="text-gray-400 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B9BFC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></span>
          <input
            className="bg-transparent border-none outline-none text-sm text-gray-500 w-full placeholder:text-gray-400"
            placeholder="Search medication, note, request…"
          />
        </div>
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B9BFC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-printer-icon lucide-printer"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg> Print Summary
        </button>
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-[#197F86] text-white border border-[] hover:bg-teal-600 transition-colors whitespace-nowrap cursor-pointer">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>  Export PDF
        </button>
      </div>
      </div>
      
    </div>
  );
}
 
/* ── Stat Strip ── */
function StatStrip() {
  const stats = [
    {
      label: "Active Medications",
      value: "3",
      sub: "Amlodipine, Paracetamol, Omeprazole",
      valueColor: "text-slate-900",
    },
    {
      label: "Latest Blood Pressure",
      value: "150/95",
      valueColor: "",
      sub: "Recorded today at 09:05 AM",
      subColor: "text-[#0F4B50] ",
    },
    {
      label: "Open Requests",
      value: "2",
      sub: "CBC and metabolic panel pending",
      badge: "Pending",
    },
    {
      label: "Recent Visits",
      value: "3",
      sub: "Last encounter on 01 Mar 2026",
    },
  ];
 
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-[#E9F7F7] border border-gray-200 rounded-xl p-4">
          <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-2">
            {s.label}
          </p>
          <p className={`text-[23px] font-bold   leading-none ${s.valueColor || "text-slate-900"}`}>
            {s.value}
          </p>
      
          <p className={`text-[15]  mt-1.5 ${s.subColor || "text-[#0F4B50]"}`}>
            {s.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
 
/* ── Reusable Card ── */
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
 
function CardHeader({ title, icon, iconBg, badge, badgeClass }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
      <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${iconBg}`}>
          {icon}
        </span>
        {title}
      </div>
      {badge && (
        <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${badgeClass}`}>
          {badge}
        </span>
      )}
    </div>
  );
}
 
/* ── Clinical Alerts ── */
function ClinicalAlerts() {
    
  return (

    <Card>
      <CardHeader
        icon={<TriangleAlert size={23} color="#7a5100" />}
        iconBg="bg-orange-50"
        title="Clinical Alerts & Sticky Notes"
        badge="Needs attention"
        badgeClass="bg-orange-50 text-orange-700 border-orange-200"
      />
      <div className="p-5">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2.5 mb-3">
          <span className="text-base flex-shrink-0 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7a5100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note-icon lucide-sticky-note"><path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M15 3v5a1 1 0 0 0 1 1h5"/></svg></span>
          <div className="text-sm text-amber-900 leading-relaxed">
            <strong className="font-semibold block mb-0.5">
              Monitor BP closely due to previous hypertensive readings.
            </strong>
            Patient is allergic to Penicillin and requires follow-up review in
            4 weeks after antihypertensive adjustment.
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          <span className="inline-flex items-center gap-1 text-[14px] px-2.5 py-1 rounded-lg  font-medium bg-red-50 text-red-700   cursor-pointer hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b1e1e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-alert-icon lucide-shield-alert"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg> Penicillin allergy
          </span>
          <span className="inline-flex items-center gap-1 text-[14px] px-2.5 py-1 rounded-lg  font-medium bg-amber-50 text-amber-700  cursor-pointer hover:opacity-80 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7D5405" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-pulse-icon lucide-heart-pulse"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg> High BP follow-up
          </span>
          <span className="inline-flex items-center gap-1 text-[14px] px-2.5 py-1 rounded-lg  font-medium bg-blue-50 text-blue-700  cursor-pointer hover:opacity-80 transition-opacity">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F4B50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-clock-icon lucide-calendar-clock"><path d="M16 14v2.2l1.6 1"/><path d="M16 2v4"/><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M3 10h5"/><path d="M8 2v4"/><circle cx="16" cy="16" r="6"/></svg> Review in 4 weeks
          </span>
        </div>
      </div>
    </Card>
  );
}
 
/* ── Patient Overview ── */
function PatientOverview() {
  const fields = [
    { label: "DOB", value: "12 Aug 1992" },
    { label: "Blood Group", value: "O+", isBloodGroup: true },
    { label: "Phone", value: "+20 100 456 8821" },
    { label: "Insurance", value: "Aqial Premium" },
    { label: "Weight", value: "72 kg" },
    { label: "Height", value: "165 cm" },
  ];
 
  return (
    <Card>
      <CardHeader  
       icon={<User  size={23} color="#197F86" />}
       iconBg=""
        title="Patient Overview" />
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          {fields.map((f, i) => (
            <div key={i}>
              <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-1">
                {f.label}
              </p>
              {f.isBloodGroup ? (
                <span className="inline-flex items-center justify-center   rounded-lg text-[15] font-bold font-mono">
                  {f.value}
                </span>
              ) : (
                <p className="text-[15px] font-medium text-slate-900">{f.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
 
/* ── Consultation Overview ── */
function ConsultationOverview() {
  return (
    <Card>
      <CardHeader
        icon={<Stethoscope  size={23} color="#197F86" />}
        iconBg=""
        title="Consultation Overview"
        badge="Current encounter"
        badgeClass="bg-green-50 text-green-700"
      />
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
          <div>
            <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-1">
              Chief Complaint
            </p>
            <p className="text-[15px] font-medium text-slate-900">Frequent morning headaches</p>
          </div>
          <div>
            <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-1">
              Primary Diagnosis
            </p>
            <span className="inline-block text-[15] text-slate-900 px-2 py-1 font-medium mt-0.5">
              I10 · Essential (primary) hypertension
            </span>
          </div>
          <div>
            <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-1">
              Attending Doctor
            </p>
            <p className="text-[15px] font-medium text-slate-900">Dr. Ahmed Anwar</p>
          </div>
          <div>
            <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-1">
              Visit Type
            </p>
            <p className="text-[15px] font-medium text-slate-900">Outpatient follow-up</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-100">
          <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-2">
            Clinical Notes
          </p>
          <p className="text-[15px] text-gray-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-lg p-3">
            Patient reported frequent morning headaches over the last two weeks.
            BP measured at 150/95. Advised to reduce sodium intake. Prescribed
            Amlodipine 5mg once daily and requested follow-up laboratory
            investigations.
          </p>
        </div>
      </div>
    </Card>
  );
}
 
/* ── Latest Vitals ── */
function LatestVitals() {
  const vitals = [
    { label: "Blood Pressure", value: "150/95", unit: "mmHg", status: "High",       statusCls: "bg-red-50 text-red-700",   dot: "bg-red-500",   valCls: "text-red-600" },
    { label: "Pulse",          value: "92",      unit: "bpm",  status: "Normal",     statusCls: "bg-green-50 text-green-700", dot: "bg-green-500", valCls: "text-slate-900" },
    { label: "Temperature",    value: "37.1",    unit: "°C",   status: "Normal",     statusCls: "bg-green-50 text-green-700", dot: "bg-green-500", valCls: "text-slate-900" },
    { label: "SpO₂",           value: "98",      unit: "%",    status: "Normal",     statusCls: "bg-green-50 text-green-700", dot: "bg-green-500", valCls: "text-slate-900" },
    { label: "Respiratory Rate", value: "18",    unit: "/min", status: "Normal",     statusCls: "bg-green-50 text-green-700", dot: "bg-green-500", valCls: "text-slate-900" },
    { label: "BMI",            value: "26.4",    unit: "",     status: "Overweight", statusCls: "bg-blue-50 text-blue-700",  dot: "bg-blue-500",  valCls: "text-slate-900" },
  ];
 
  return (
    <Card>
      <CardHeader
        icon={<Activity  size={23} color="#197F86" />}
        iconBg=""
        title="Latest Vital Signs"
        badge="Recorded today"
        badgeClass="bg-blue-50 text-blue-700 border-blue-200"
      />
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          {vitals.map((v, i) => (
            <div key={i} className="bg-[#F6F7F8] border border-slate-100 rounded-xl p-3">
              <p className="text-[14px] uppercase tracking-wide text-gray-400 font-medium mb-1">
                {v.label}
              </p>
              <p className={`text-xl font-semibold font-mono leading-none ${v.valCls}`}>
                {v.value}
                <span className="text-xs text-gray-400 font-normal ml-0.5">{v.unit}</span>
              </p>
              <span className={`inline-flex items-center gap-1 text-[13px] font-medium mt-1.5 px-1.5 py-0.5 rounded-full ${v.statusCls}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${v.dot}`}></span>
                {v.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
 
/* ── Active Medications ── */



function Dashboard  (){ return (
    <div className=" font-sans">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Medication & History (Spans 2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Medication Record Section */}
          <section className="bg-white border-gray-200 rounded-xl shadow-sm border  overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
              <div className="flex items-center gap-2 font-semibold">
                <Pill size={23} color="#197F86" />
                <h2>Medication Record</h2>
              </div>
              <span className="text-xs text-slate-400">Active treatment</span>
            </div>

            <div className="p-4 space-y-4">
              {/* Medication Item */}
              <MedicationItem 
                name="Amlodipine 5mg tablet" 
                instruction="1 tablet once daily after breakfast"
                status="Active"
                tags={["Started 01 Mar 2026", "30 days"]}
                type="Active"
              />
              <MedicationItem 
                name="Paracetamol 500mg" 
                instruction="1 tablet when needed for headache, max 3/day"
                status="Supportive"
                tags={["PRN"]}
              />
              <MedicationItem 
                name="Omeprazole 20mg capsule" 
                instruction="1 capsule before breakfast"
                status="Ongoing"
                tags={["Gastric protection"]}
              />
            </div>
          </section>

          {/* Recent Visit History */}
          <section className="bg-white border-gray-200 rounded-xl   shadow-sm border overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2  text-slate-900 font-semibold">
                <History size={23}  color="#197F86"/>
                <h2>Recent Visit History</h2>
              </div>
              <span className="text-xs text-slate-400">Last 3 encounters</span>
            </div>
            
            <div className="p-4 space-y-6">
              <VisitItem 
                date="01 Mar 2026, 09:15 AM"
                dept="Internal Medicine"
                doctor="Dr. Ahmed Anwar"
                reason="Hypertension follow-up with medication adjustment"
                badges={["Outpatient", "1 prescription", "1 lab request"]}
              />
              <VisitItem 
                date="15 Feb 2026, 11:30 AM"
                dept="Emergency Clinic"
                doctor="Dr. Sarah Mahmoud"
                reason="Palpitations, ECG completed, discharged stable"
                badges={["Outpatient", "1 prescription", "1 lab request"]}

              />
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Requests & Results */}
        <div className="space-y-6">
          
          {/* Diagnostic Requests */}
          <section className="bg-white border-gray-200 rounded-xl shadow-sm border  overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2  text-slate-900 font-semibold">
                <FileUser size={23} color="#197F86" />
                <h2>Diagnostic Requests</h2>
              </div>
              <span className="text-xs text-slate-400 font-medium">Pending & recent</span>
            </div>
            <div className="divide-y divide-slate-50">
              <RequestItem title="Complete Blood Count (CBC)" date="Requested 01 Mar 2026" priority="Routine" status="Pending" />
              <RequestItem title="Comprehensive Metabolic Panel" date="Requested 01 Mar 2026" priority="Routine" status="Pending" />
              <RequestItem title="ECG Report" date="Completed 15 Feb 2026" priority="Emergency visit" status="Completed" />
            </div>
          </section>

          {/* Attachments & Results */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center gap-2  text-slate-900 font-semibold">
              <Paperclip size={23} color="#197F86" />
              <h2>Attachments & Results</h2>
            </div>
            <div className="p-2 space-y-1">
              <FileItem title="ECG Report.pdf" desc="Uploaded from Emergency Clinic • 15 Feb 2026" />
              <FileItem title="CBC Result.pdf" desc="Routine screening result • 10 Jan 2026" />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const MedicationItem = ({ name, instruction, status, tags, type }) => (
  <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100 relative">
    <div className="flex justify-between items-start mb-1">
      <h3 className="font-bold text-slate-800 text-sm md:text-base">{name}</h3>
      <span className="text-[13px] uppercase tracking-wider text-slate-400 font-medium">{status}</span>
    </div>
    <p className="text-slate-500 text-xs md:text-sm mb-3">{instruction}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <span key={tag} className={`px-2 py-1 rounded text-[11px] font-medium ${tag.includes('Started') ? 'bg-emerald-100 text-emerald-700' : 'bg-cyan-50 text-cyan-700'}`}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const VisitItem = ({ date, dept, doctor, reason, badges = [] }) => (
  <div className="border-b border-slate-50 last:border-0 pb-4 last:pb-0">
    <div className="flex justify-between items-start mb-1">
      <div className="text-sm font-bold text-slate-700 flex items-center gap-2">
        {date} <span className="text-slate-300">•</span> {dept}
      </div>
      <div className="text-xs text-slate-400">{doctor}</div>
    </div>
    <p className="text-sm text-slate-500 mb-3">{reason}</p>
    <div className="flex flex-wrap gap-2">
      {badges.map(b => (
        <span key={b} className="px-2 py-1 bg-teal-50 text-teal-600 rounded text-[11px] font-medium border border-teal-100">
          {b}
        </span>
      ))}
    </div>
  </div>
);

const RequestItem = ({ title, date, priority, status }) => (
  <div className="p-4 flex justify-between items-center group hover:bg-slate-50 transition-colors">
    <div className="space-y-1">
      <h4 className="text-sm font-bold text-slate-700 leading-none">{title}</h4>
      <p className="text-[11px] text-slate-400">{date} • Priority: {priority}</p>
    </div>
    <span className={`text-xs font-medium ${status === 'Pending' ? 'text-slate-300' : 'text-emerald-500'}`}>
      {status}
    </span>
  </div>
);

const FileItem = ({ title, desc }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
    <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400">
      <Paperclip size={16} />
    </div>
    <div className="flex-1">
      <div className="flex justify-between">
        <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
        <span className="text-[10px] text-slate-400 font-bold">PDF</span>
      </div>
      <p className="text-[11px] text-slate-400">{desc}</p>
    </div>
  </div>
);




 
/* ── Root export ── */
export default function PatientSummary() {
  return (
    <div className="min-h-screen pb-8">
      <TopNav />
      <PageHeader />
      <div className=" mx-auto px-4 sm:px-5 pt-5 flex flex-col gap-4">
        <StatStrip />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ClinicalAlerts />
          <PatientOverview />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ConsultationOverview />
          <LatestVitals />
        </div>
        
        <Dashboard/>
      </div>
    </div>
  );
}
 