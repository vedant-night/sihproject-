import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
});

export const fetchDestinations = async () => {
  const { data } = await api.get('/api/destinations');
  return data;
};

export const fetchForecast = async (id) => {
  const { data } = await api.get(`/api/congestion-forecast/${id}`);
  return data;
};

export const fetchRecommendations = async (nearId) => {
  const { data } = await api.get(`/api/recommendations?near_id=${nearId}`);
  return data;
};

export const createBooking = async (bookingData) => {
  const { data } = await api.post('/api/bookings', bookingData);
  return data;
};
