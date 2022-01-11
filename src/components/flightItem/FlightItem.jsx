import { FlightItemHeader } from '../';
import { FlightTicket } from '../';
import styles from './FlightItem.module.css';

export const FlightItem = () => {
  return (
    <div className={styles.flightItem}>
      <FlightItemHeader />
      <FlightTicket />
      <div className={styles.divider}></div>
      <FlightTicket />
      <button className={styles.choiceButton}>{'Выбрать'}</button>
    </div>
  )
}