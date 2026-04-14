import { Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import { OpdDashboard }       from './pages/opd-dashboard'
import { EmergencyDashboard } from './pages/emergency-dashboard'
import { NewBooking }         from './pages/new-booking'
import PatientSummary         from './pages/patient-summary'
import Navbar        from './components/Navbar'
import MedicalRecord from './pages/MedicalRecord'
import ConsultationForm from "./pages/ConsultationForm";
import Patientinfo from "./pages/Patientinfo";


function NewBookingPage() {
  const navigate = useNavigate()
  return <NewBooking onCancel={() => navigate(-1)} />
}

// Root layout — Navbar sidebar appears on every page.
// Every route is an item navigable from the Navbar.
function RootLayout() {
  return (
    <div className="flex w-full min-h-screen">
      <Navbar />
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/opd-dashboard"       element={<OpdDashboard />} />
        <Route path="/emergency-dashboard" element={<EmergencyDashboard />} />
        <Route path="/CRM-view"            element={<NewBookingPage />} />
        <Route path="/consultationform"    element={<ConsultationForm />} />
        <Route path="/consultation"/>
          <Route path="medicalrecord"   element={<MedicalRecord />} />
          <Route path="patient-summary" element={<PatientSummary />} />
          <Route path="/Patientinfo" element={<Patientinfo/>} />       

        </Route>
      </Route>
    </Routes>
  )
}

export default App
