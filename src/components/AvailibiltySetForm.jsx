import React, { useState } from 'react';

export default function AvailibiltySetForm({ onAvailabilityAdded }) {
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [appointmentDuration, setAppointmentDuration] = useState('30'); // default 30 min

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctor = JSON.parse(localStorage.getItem('doctor'));

    if (!doctor) {
      alert('Doctor not logged in');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: doctor.id,
          date: selectedDate,
          fromTime: fromTime,
          toTime: toTime,
          appointmentDuration: parseInt(appointmentDuration),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Availability saved successfully!');
        // Optional → reset form
        setSelectedDate('');
        setFromTime('');
        setToTime('');
        setAppointmentDuration('30');
      }
      if (typeof onAvailabilityAdded === 'function') {
      onAvailabilityAdded(); // 👈 THIS MUST BE CALLED to trigger refresh
      } else {
        alert(data.message || 'Failed to save availability');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-[400px]">
      <h2 className="text-2xl font-semibold text-black mb-4">Set Availability</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Date Picker */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Time Range */}
        <div className="flex justify-between space-x-4">
          {/* From */}
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-600 mb-1">From</label>
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* To */}
          <div className="flex flex-col flex-1">
            <label className="text-sm text-gray-600 mb-1">To</label>
            <input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              className="border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
        </div>

        {/* Appointment Duration */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Appointment Duration (minutes)</label>
          <select
            value={appointmentDuration}
            onChange={(e) => setAppointmentDuration(e.target.value)}
            className="border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="15">15 minutes</option>
            <option value="20">20 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#3E36B0] text-white font-semibold px-6 py-2 rounded shadow hover:bg-indigo-700 transition-all"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
