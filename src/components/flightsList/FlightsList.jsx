import { FlightItem } from '..';
import { useAPI } from '../../apiContext';
import { useFiltersContext } from '../../filtersContext';
import styles from './FlightsList.module.css';

export const FlightsList = () => {
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
  }

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
  }

  const filteredPriceFlights = (flights) => {
    return flights.filter(flight =>
      flight.flight.price.total.amount >= filterPrice.from &&
      flight.flight.price.total.amount <= filterPrice.to)
  }

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
  }

  const filteredFlights = sortedFlights(filteredTransfersFlights(filteredPriceFlights(filteredAirlinesFlights(flights))));

  return(
    <div className={styles.flightsList}>
      {
        filteredFlights
        &&
        filteredFlights.map(flight => (
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
