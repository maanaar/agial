import { Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import { OpdDashboard }       from './pages/opd-dashboard'
import { EmergencyDashboard } from './pages/emergency-dashboard'
import { NewBooking }         from './pages/new-booking'
import PatientSummary         from './pages/patient-summary'
import Navbar        from './components/Navbar'
import MedicalRecord from './pages/MedicalRecord'
import ConsultationForm from './pages/ConsultationForm'
import Patientinfo from './pages/Patientinfo'
import InpatientAdmission from './pages/InpatientAdmission'
import VitalSigns from './pages/VitalSigns'


function NewBookingPage() {
  const navigate = useNavigate()
  return <NewBooking onCancel={() => navigate(-1)} />
}

// Shared layout for all consultation-area pages.
// Renders the Navbar sidebar + the active child page via Outlet.
function ConsultationLayout() {
  return (
    <div className="relative z-10 flex w-full flex-1 flex-col lg:flex-row min-h-screen">
      <Navbar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      {/* Standalone pages — no consultation Navbar */}
      <Route path="/opd-dashboard"       element={<OpdDashboard />} />
      <Route path="/emergency-dashboard" element={<EmergencyDashboard />} />
      <Route path="/CRM-view"            element={<NewBookingPage />} />

      {/* Consultation area — Navbar persists across all sub-pages */}
      <Route path="/consultationform" element={<ConsultationLayout />}>
        <Route index                    element={<ConsultationForm />} />
        <Route path="medicalrecord"     element={<MedicalRecord />} />
                          <Route path="vitalSigns" element={<VitalSigns/>} />
        <Route path="patient-summary"   element={<PatientSummary />} />
        <Route path="Patientinfo" element={<Patientinfo/>} />
        <Route path="inpatientadmission" element={<InpatientAdmission/>} />
      </Route>
    </Routes>
  )
}

export default App
