import Logo from '../assets/Logo.svg';

import {Settings ,ClockPlus,MessageSquareMore , Calendar ,LayoutDashboard, Users, CalendarDays, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-20 bg-[#3E36B0] text-white flex flex-col items-center py-6 space-y-8 min-h-screen rounded-l-4xl ">
      {/* Logo */}
      
          <img src={Logo} alt="MedMate Logo" className="h-15 w-auto cursor-pointer  rotate-90" />
        


      {/* Navigation Icons */}
      <div className="flex flex-col space-y-12 text-white text-center mt-[50px]">
        <Link to="/dashboard">
        <LayoutDashboard className="w-6 h-6 hover:text-blue-300 cursor-pointer" />
        </Link>
        <Link to="/availibilty">
        <Calendar className="w-6 h-6 hover:text-blue-300 cursor-pointer" />
        </Link>
        <Link to="/doctor/chat">
          <MessageSquareMore className="w-6 h-6 hover:text-blue-300 cursor-pointer" />
        </Link>
        <ClockPlus className="w-6 h-6 hover:text-blue-300 cursor-pointer" />
        <Settings className="w-6 h-6 hover:text-blue-300 cursor-pointer" />
        <Link to="/">
        <LogOut className="w-6 h-6 hover:text-red-400 cursor-pointer" />
        </Link>
      </div>

      {/* Logout */}
      <div className="mt-auto">
        
      </div>
    </div>
  );
}