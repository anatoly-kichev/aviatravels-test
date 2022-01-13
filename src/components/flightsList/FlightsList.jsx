import { useState } from 'react';
import { FlightItem } from '..';
import { useAPI } from '../../context/apiContext';
import { useFiltersContext } from '../../context/filtersContext';
import styles from './FlightsList.module.css';

export const FlightsList = () => {
  const [pageSize, setPageSize] = useState(3);
  const { flights } = useAPI();
  const {
    filterSort,
    filterTransfers,
    filterPrice,
    activeFilterAirlines
  } = useFiltersContext();

  const sortedFlights = (flights) => {
    switch (filterSort) {
      case 'ASCENDING':
        return flights.slice().sort(
          (firstFlight, secondFlight) => firstFlight.flight.price.total.amount - secondFlight.flight.price.total.amount);
      case 'DESCENDING':
        return flights.slice().sort(
          (firstFlight, secondFlight) => secondFlight.flight.price.total.amount - firstFlight.flight.price.total.amount);
      case 'TIME_TRAVEL':
        return flights.slice().sort(
          (firstFlight, secondFlight) => firstFlight.flight.legs[0].duration + firstFlight.flight.legs[1].duration
          - secondFlight.flight.legs[0].duration - secondFlight.flight.legs[1].duration);
      default:
        return flights;
    }
  };

  const filteredTransfersFlights = (flights) => {
    const { zero, one } = filterTransfers;
    const isAll = (zero && one) || (!zero && !one);

    if (isAll) {
      return flights;
    } else if (zero) {
      return flights.filter(flight =>
        flight.flight.legs[0].segments.length + flight.flight.legs[1].segments.length === 2);
    } else if (one) {
      return flights.filter(flight =>
        flight.flight.legs[0].segments.length + flight.flight.legs[1].segments.length > 2);
    } else {
      return flights;
    }
  };

  const filteredPriceFlights = (flights) => {
    return flights.filter(flight =>
      flight.flight.price.total.amount >= filterPrice.from &&
      flight.flight.price.total.amount <= filterPrice.to)
  };

  const filteredAirlinesFlights = (flights) => {
    if (activeFilterAirlines.length > 0) {
      return flights.filter(flight => {
        for (let airline of activeFilterAirlines) {
          if (flight.flight.carrier.uid === airline) {
            return true;
          }
        }
        return false;
      })
    }
    return flights;
  };

  const handleClickExtraButton = () => {
    setPageSize(pageSize + 6);
  };

  const filteredFlights = sortedFlights(filteredTransfersFlights(filteredPriceFlights(filteredAirlinesFlights(flights))));
  const isShowExtraButton = pageSize !== 0 && !(filteredFlights.length <= pageSize);

  return(
    <div className={styles.flightsList}>
      {
        filteredFlights.length === 0
        ? <div className={styles.placeholder}>
            {flights.length === 0 ? 'Данные загружаются...' : 'Перелетов с такими фильтрами не найдено'}
          </div>
        : filteredFlights
          .slice(0, Math.min(pageSize, filteredFlights.length))
          .map(flight => (
            <FlightItem
              key={flight.flightToken}
              flight={flight.flight}
            />
          ))
      }

      {
        isShowExtraButton &&
        <button
          className={styles.extraButton}
          onClick={handleClickExtraButton}
        >
          {'Показать еще'}
        </button>
      }
    </div>
  )
};
