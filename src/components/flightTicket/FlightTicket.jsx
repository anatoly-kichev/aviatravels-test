import styles from './FlightTicket.module.css';

export const FlightTicket = ({
  departureCity,
  arrivalCity,
  departureAirport,
  arrivalAirport,
  departureDate,
  arrivalDate,
  duration,
  transfersCount,
  airline
}) => {
  return (
    <div className={styles.ticket}>
      <div className={styles.direction}>
        <span className={styles.city}>{`${departureCity}, ${departureAirport.caption} `}</span>
        <span className={styles.airport}>{`(${departureAirport.uid}) `}</span>
        <span className={styles.arrow}>&#8594;</span>
        <span className={styles.city}>{` ${arrivalCity}, ${arrivalAirport.caption} `}</span>
        <span className={styles.airport}>{` (${arrivalAirport.uid}) `}</span>
      </div>

      <div className={styles.timeBlock}>
        <div className={styles.timeBlockItem}>
          <span className={styles.time}>
            {`${departureDate.toLocaleString('ru-Ru', { hour: '2-digit', minute: '2-digit'})} `}
          </span>
          <span className={styles.date}>
            {`${departureDate.toLocaleString('ru-Ru', { day: 'numeric' })}
              ${departureDate.toLocaleString('ru-Ru', { month: 'short' })}
              ${departureDate.toLocaleString('ru-Ru', { weekday: 'short' })}
            `}
          </span>
        </div>

        <div className={styles.timeBlockItem}>
          <img
            className={styles.timeIcon}
            src={`${process.env.PUBLIC_URL}/timeIcon.svg`}
            alt="time icon"
          />
          <span className={styles.duration}>
            {` ${Math.floor(duration / 60)} ч ${duration % 60} мин`}
          </span>
        </div>

        <div className={styles.timeBlockItem}>
          <span className={styles.date}>
            {`${arrivalDate.toLocaleString('ru-Ru', { day: 'numeric' })}
              ${arrivalDate.toLocaleString('ru-Ru', { month: 'short' })}
              ${arrivalDate.toLocaleString('ru-Ru', { weekday: 'short' })}
            `}
          </span>
          <span className={styles.time}>
            {` ${arrivalDate.toLocaleString('ru-Ru', { hour: '2-digit', minute: '2-digit'})}`}
          </span>
        </div>
      </div>

      <div className={styles.transfers}>
        {transfersCount !== 0 && <span>{`${transfersCount} пересадка`}</span>}
      </div>

      <div className={styles.flightDescription}>
        {`Рейс выполняет: ${airline}`}
      </div>
    </div>
  )
};
