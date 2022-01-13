import React, { useState, useContext, createContext } from 'react';

const FiltersContext = createContext();

export const FiltersContextProvider = ({ children }) => {
  const [filterSort, setFilterSort] = useState();
  const [filterTransfers, setFilterTransfers] = useState({
    zero: false,
    one: false
  });
  const [filterPrice, setFilterPrice] = useState({
    from: 0,
    to: 1000000
  });
  const [activeFilterAirlines, setActiveFilterAirlines] = useState([]);

  return (
    <FiltersContext.Provider
      value={{
        filterSort,
        filterTransfers,
        filterPrice,
        activeFilterAirlines,
        setFilterSort,
        setFilterTransfers,
        setFilterPrice,
        setActiveFilterAirlines
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }

  return context;
}
