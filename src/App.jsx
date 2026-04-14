// import { useState } from 'react'
// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar'
import MedicalRecord from './pages/MedicalRecord'
import ConsultationForm from "./pages/ConsultationForm";


function App() {


  return (
  
     <div className="relative flex flex-col w-full min-h-screen">


      <div className="relative z-10 flex  w-full flex-1 flex-col lg:flex-row">
         <Navbar/>
      

        <main className="w-full flex-1">
            <Routes>
              <Route path="/consultationform" element={<ConsultationForm/>} />
              <Route path="/medicalrecord" element={<MedicalRecord/>} />
            </Routes>
         
        </main>
      </div>
    </div>
    
  )
}

export default App
