import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { DoctorHeader } from '../components/DoctorHeader';
import { GreetingBanner } from '../components/GreetingBanner';
import { VisitCalendarCards } from '../components/VisitCalendarCards';
import { PatientConsultNews } from '../components/PatientConsultNews';


export default function Dashboard() {
  
  const [patients, setPatients] = useState([]);
  const [visitCount, setVisitCount] = useState(0); // You can update this dynamically if needed

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem('doctor'));
    if (!doctor?.id) return;

    fetch(`http://localhost:5000/api/appointments/doctor/${doctor.id}/patients`)
      .then(res => res.json())
      .then(data => {
        setPatients(data);
        setVisitCount(data.length); // optional: count of visits
      })
      .catch(err => console.error('Failed to fetch patients:', err));
  }, []);

  const doctorName = 'Dr. Anas Siddiqui'; // You can also fetch this from localStorage or backend

  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#3E36B0] overflow-hidden pt-3 pb-3 pr-3 rounded-r-4xl">
        <div className="bg-white rounded-4xl h-full w-full p-4">
          <DoctorHeader />
          <GreetingBanner doctorName={doctorName} />
          <VisitCalendarCards visitCount={visitCount} />
          <PatientConsultNews patients={patients} />
         
        </div>
      </div>
    </div>
  );
}
// This is the main dashboard page for doctors, integrating various components