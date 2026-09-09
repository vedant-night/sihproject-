import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, selectDestination] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        destinations,
        setDestinations,
        selectedDestination,
        selectDestination,
        forecast,
        setForecast,
        recommendations,
        setRecommendations,
        loading,
        setLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
