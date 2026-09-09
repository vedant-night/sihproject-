import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchForecast, fetchRecommendations } from '../api/client';

export const useForecast = () => {
  const { selectedDestination, setForecast, setRecommendations } = useAppContext();

  useEffect(() => {
    if (!selectedDestination) {
      setForecast(null);
      setRecommendations(null);
      return;
    }

    const loadData = async () => {
      try {
        const forecastData = await fetchForecast(selectedDestination.id);
        setForecast(forecastData);

        if (selectedDestination.type === 'hotspot' || selectedDestination.zone === 'RED') {
          const recsData = await fetchRecommendations(selectedDestination.id);
          setRecommendations(recsData);
        } else {
          setRecommendations(null);
        }
      } catch (error) {
        console.error("Failed to fetch forecast/recommendations:", error);
      }
    };

    loadData();
  }, [selectedDestination, setForecast, setRecommendations]);
};
