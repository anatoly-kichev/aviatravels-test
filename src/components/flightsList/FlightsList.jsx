import { useEffect, useState } from 'react';
import { FlightItem } from '..';
import styles from './FlightsList.module.css';

export const FlightsList = () => {
  const [flights, setFlights] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/result')
      .then(response => response.json())
      .then(result => result.flights)
      .then(result => {
        setFlights(result);
      });
  }, [])

  return(
    <div className={styles.flightsList}>
      {
        flights
        &&
        flights.map(flight => (
          <FlightItem
            key={flight.flightToken}
            flight={flight.flight}
          />
        ))
      }

      <button className={styles.extraButton}>{'Показать еще'}</button>
    </div>
  )
};
