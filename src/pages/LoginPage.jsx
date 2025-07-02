import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      role === 'doctor'
        ? 'http://localhost:5000/api/doctor/login'
        : 'http://localhost:5000/api/patient/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const storageKey = role === 'doctor' ? 'doctor' : 'patient';
        localStorage.setItem(storageKey, JSON.stringify(data[storageKey]));
        localStorage.setItem('token', data.token);

       
        navigate(role === 'doctor' ? '/dashboard' : '/patient');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
        <div className="bg-white rounded-3xl shadow-lg p-10 w-[400px] text-center">
          <h2 className="text-3xl font-bold text-[#3E36B0] mb-6">Login As</h2>
          <div className="space-y-4">
            <button
              onClick={() => setRole('doctor')}
              className="w-full bg-[#3E36B0] text-white font-semibold py-2 rounded-lg shadow hover:bg-indigo-700 transition-all"
            >
              Doctor
            </button>
            <button
              onClick={() => setRole('patient')}
              className="w-full bg-[#3E36B0] text-white font-semibold py-2 rounded-lg shadow hover:bg-indigo-700 transition-all"
            >
              Patient
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white rounded-3xl shadow-lg p-10 w-[400px]">
        <h2 className="text-3xl font-bold text-[#3E36B0] mb-6 text-center">
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-green-400 w-full rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-green-400 w-full rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3E36B0] text-white font-semibold py-2 rounded-lg shadow hover:bg-indigo-700 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
