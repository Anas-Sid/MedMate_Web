import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import Availibilty from './pages/Availibilty';
import Portal from './pages/Portal';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PatientDashboard from './pages/PatientDashboard';
import Bookappointment from './pages/Bookappointment';
import DoctorBookingCard from './components/patientdashboradcomponent/DoctorBookingCard';

export default function App() {
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
    </Routes>
  );
}