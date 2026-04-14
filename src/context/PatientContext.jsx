import { createContext, useContext, useState } from 'react'

const PatientContext = createContext(null)

export function PatientProvider({ children }) {
  const [patient, setPatient] = useState(null)
  return (
    <PatientContext.Provider value={{ patient, setPatient }}>
      {children}
    </PatientContext.Provider>
  )
}

export const usePatient = () => useContext(PatientContext)
