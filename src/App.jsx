import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import Availibilty from './pages/Availibilty';
import Portal from './pages/Portal';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PatientDashboard from './pages/PatientDashboard';
import Bookappointment from './pages/Bookappointment';
import DoctorBookingCard from './components/patientdashboradcomponent/DoctorBookingCard';
import ChatLayout from './components/chat/ChatLayout';
import PatientChat from './pages/PatientChat';
import DoctorChat from './pages/DoctorChat';


export default function App() {
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const patient = JSON.parse(localStorage.getItem("patient"));
  

  return (
    
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/availibilty" element={<Availibilty />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/apointmentbook" element={<Bookappointment />} />
        <Route path="/doctor/:id" element={<DoctorBookingCard />} />

        {/* ✅ Chat route with auth check */}
        <Route
          path="/doctor/chat"
          element={
            doctor ? (
              <DoctorChat currentUser={doctor} role="doctor" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/patient/chat"
          element={
            patient ? (
              <PatientChat currentUser={patient} role="patient" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
   
  );
}
