import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { OpdDashboard }       from './pages/opd-dashboard'
import { EmergencyDashboard } from './pages/emergency-dashboard'
import { NewBooking }         from './pages/new-booking'
import PatientSummary         from './pages/patient-summary'

function NewBookingPage() {
  const navigate = useNavigate()
  return <NewBooking onCancel={() => navigate(-1)} />
}

function App() {
  return (
    <Routes>
      <Route path="/opd-dashboard"       element={<OpdDashboard />} />
      <Route path="/emergency-dashboard" element={<EmergencyDashboard />} />
      <Route path="/new-booking"         element={<NewBookingPage />} />
      <Route path="/patient-summary"     element={<PatientSummary />} />
      <Route path="*" element={<Navigate to="/opd-dashboard" replace />} />
    </Routes>
  )
}

export default App
