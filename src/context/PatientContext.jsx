import { createContext, useContext, useState, useEffect } from 'react'

const PatientContext = createContext(null)
const STORAGE_KEY = 'agial_patient'

function readStored() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') }
  catch { return null }
}

export function PatientProvider({ children }) {
  const [patient, setPatientState] = useState(readStored)

  // One-time handoff: Odoo can write patient JSON to __odoo_patient__ before
  // opening the React app; we read it once on mount then remove it.
  useEffect(() => {
    const stored = localStorage.getItem('__odoo_patient__')
    if (stored) {
      try { setPatient(JSON.parse(stored)) } catch (_) {}
      localStorage.removeItem('__odoo_patient__')
    }
  }, [])

  function setPatient(p) {
    setPatientState(p)
    try {
      if (p) localStorage.setItem(STORAGE_KEY, JSON.stringify(p))
      else    localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }

  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  )
}

export const usePatient = () => useContext(PatientContext)
