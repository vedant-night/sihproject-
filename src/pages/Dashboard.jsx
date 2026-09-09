import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MapDashboard from '../components/MapDashboard';
import AlternativeModal from '../components/AlternativeModal';
import BookingForm from '../components/BookingForm';
import { useDestinations } from '../hooks/useDestinations';
import { useForecast } from '../hooks/useForecast';

const Dashboard = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  
  // Initialize hooks to fetch data
  useDestinations();
  useForecast();

  return (
    <main className="flex-1 flex overflow-hidden relative">
      <Sidebar setBookingOpen={setBookingOpen} />
      <div className="flex-1 relative">
        <MapDashboard />
      </div>
      
      <AlternativeModal setBookingOpen={setBookingOpen} />
      
      {bookingOpen && (
        <BookingForm onClose={() => setBookingOpen(false)} />
      )}
    </main>
  );
};

export default Dashboard;
