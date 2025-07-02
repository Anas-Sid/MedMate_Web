// components/patientdashboardcomponent/RightSidebar.jsx
import { Home, CalendarDays, MessageCircle, PieChart, Settings, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RightSidebar() {
  return (
    <div className="fixed right-0 top-0 h-full w-16 bg-gradient-to-r from-[#B4C1FF] via-[#8097E9] to-[#3E36B0] shadow-md flex flex-col items-center pt-6 rounded-4xl z-50    ">
      <div className="mb-6">
        <User className="w-8 h-8 text-black" />
      </div>
      <div className="flex flex-col gap-6 mt-[50px]">
        <Link to="/patient">
        <SidebarIcon icon={<Home />} />
        </Link>
       <Link to="/apointmentbook">
        <SidebarIcon icon={<CalendarDays />} />
        </Link>
        
        <SidebarIcon icon={<MessageCircle />} />
        <SidebarIcon icon={<PieChart />} />
        <SidebarIcon icon={<Settings />} />
      </div>
      <div className="mt-auto mb-6">
        <Link to="/">
        <SidebarIcon icon={<LogOut />} />
        </Link>
      </div>
    </div>
  );
}

function SidebarIcon({ icon }) {
  return (
    <div className="bg-transparent hover:bg-[#f0f0ff] p-2 rounded-xl cursor-pointer transition-all">
      {icon}
    </div>
  );
}
