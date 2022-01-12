import { FlightItemHeader } from '../';
import { FlightTicket } from '../';
import styles from './FlightItem.module.css';

export const FlightItem = ({ flight }) => {
  const createFlightTicket = (leg) => {
    const transfersCount = leg.segments.length - 1;
    const firstSegment = leg.segments[0];
    const lastSegment = leg.segments[transfersCount];
    const airline = (lastSegment.operatingAirline
                && lastSegment.operatingAirline.caption)
                || (firstSegment.airline
                && firstSegment.airline.caption);

    return (
      <FlightTicket
        departureCity={firstSegment.departureCity && firstSegment.departureCity.caption}
        arrivalCity={lastSegment.arrivalCity && lastSegment.arrivalCity.caption}
        departureAirport={firstSegment.departureAirport}
        arrivalAirport={lastSegment.arrivalAirport}
        departureDate={new Date(firstSegment.departureDate)}
        arrivalDate={new Date(lastSegment.arrivalDate)}
        duration={leg.duration}
        transfersCount={transfersCount}
        airline={airline}
      />
    )
  }

  return (
    <div className={styles.flightItem}>
      <FlightItemHeader
        price={flight.price.total.amount}
        carrier={flight.carrier.caption}
      />
      {createFlightTicket(flight.legs[0])}
      <div className={styles.divider}></div>
      {createFlightTicket(flight.legs[1])}
      <button className={styles.choiceButton}>{'Выбрать'}</button>
    </div>
  )
}