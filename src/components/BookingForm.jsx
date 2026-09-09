import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';
import { createBooking } from '../api/client';

const BookingForm = ({ onClose }) => {
  const { selectedDestination } = useAppContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    group_size: 1,
    guide_preference: 'Local Expert'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDestination) return;

    try {
      setIsSubmitting(true);
      await createBooking({
        destination_id: selectedDestination.id,
        ...formData,
        group_size: Number(formData.group_size)
      });
      toast.success('Booking confirmed! 🎉');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to create booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedDestination) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Book Experience</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl leading-none">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Destination</label>
            <div className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300">
              {selectedDestination.name}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Email</label>
            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-400 mb-1">Date</label>
              <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none [color-scheme:dark]" />
            </div>
            <div className="w-24">
              <label className="block text-xs font-medium text-slate-400 mb-1">Group Size</label>
              <input required type="number" min="1" max="20" name="group_size" value={formData.group_size} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Guide Preference</label>
            <select name="guide_preference" value={formData.guide_preference} onChange={handleChange} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none">
              <option>Local Expert</option>
              <option>Nature Guide</option>
              <option>Heritage Specialist</option>
              <option>No Guide Needed</option>
            </select>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2 text-sm font-medium bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors disabled:opacity-50">
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
