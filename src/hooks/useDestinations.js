import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { fetchDestinations } from '../api/client';

export const useDestinations = () => {
  const { setDestinations, setLoading } = useAppContext();

  useEffect(() => {
    let intervalId;

    const loadDestinations = async () => {
      try {
        setLoading(true);
        const data = await fetchDestinations();
        if (data && data.destinations) {
          setDestinations(data.destinations);
        }
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDestinations();
    intervalId = setInterval(loadDestinations, 30000); // Poll every 30 seconds

    return () => clearInterval(intervalId);
  }, [setDestinations, setLoading]);
};
