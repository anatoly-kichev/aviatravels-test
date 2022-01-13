import React, { useContext, useState, useEffect, createContext } from 'react';

const APIContext = createContext();

export const APIContextProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/result')
      .then(response => response.json())
      .then(result => {
        setFlights(result.flights);
        setAirlines(result.bestPrices.ONE_CONNECTION.bestFlights);
      });
  }, [])

  return (
    <APIContext.Provider
      value={{
        flights,
        airlines
      }}
    >
      {children}
    </APIContext.Provider>
  );
}

export const useAPI = () => {
  const context = useContext(APIContext);

  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }

  return context;
}
