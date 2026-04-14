import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from './components/navbar'
import MedicalRecord from './pages/MedicalRecord'
import { OpdDashboard }       from './pages/opd-dashboard'
import { EmergencyDashboard } from './pages/emergency-dashboard'
import { NewBooking }         from './pages/new-booking'

function NewBookingPage() {
  const navigate = useNavigate()
  return <NewBooking onCancel={() => navigate(-1)} />
}

function App() {
  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <div className="relative z-10 flex w-full flex-1 flex-col lg:flex-row">
        <Navbar/>
        <main className="w-full flex-1">
          <Routes>
            <Route path="/medicalrecord"       element={<MedicalRecord/>} />
            <Route path="/opd-dashboard"       element={<OpdDashboard />} />
            <Route path="/emergency-dashboard" element={<EmergencyDashboard />} />
            <Route path="/new-booking"         element={<NewBookingPage />} />
            <Route path="*" element={<Navigate to="/opd-dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
