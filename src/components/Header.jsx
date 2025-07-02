import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-700">MedMate</div>
        <nav className="space-x-6 text-gray-700 font-medium hidden md:block">

          <a href="#home" className="hover:text-blue-500">Home</a>

          <a href="#about" className="hover:text-blue-500">About Us</a>
          <a href="#services" className="hover:text-blue-500">Our Services</a>
          <a href="#whychoose" className="hover:text-blue-500">Contact Us</a>
        </nav>
        <div className="space-x-2 hidden md:block">
          <Link to="/login">
        <button className="px-7 py-1.5 border mr-5 border-blue-600 text-blue-600 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:text-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
        Login
        </button>
        </Link>
        <Link to="/signup">
        <button className="px-7 py-1.5 bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
        Signup
        </button>
        </Link>
</div>
      </div>
    </header>
  );
}
