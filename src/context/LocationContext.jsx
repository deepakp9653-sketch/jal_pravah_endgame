import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  // If globalCityData is null, components default to their local "Delhi" behavior.
  const [globalCityData, setGlobalCityData] = useState(null);
  const [isGlobalSearching, setIsGlobalSearching] = useState(false);
  const [globalWeather, setGlobalWeather] = useState(null);
  const [globalOsmDrainage, setGlobalOsmDrainage] = useState([]);

  return (
    <LocationContext.Provider value={{
      globalCityData, setGlobalCityData,
      isGlobalSearching, setIsGlobalSearching,
      globalWeather, setGlobalWeather,
      globalOsmDrainage, setGlobalOsmDrainage
    }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  return useContext(LocationContext);
}
