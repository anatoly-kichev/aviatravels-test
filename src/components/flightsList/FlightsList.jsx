import { FlightItem } from '..';
import styles from './FlightsList.module.css';

export const FlightsList = () => {
  return(
    <div className={styles.flightsList}>
      <FlightItem />
      <FlightItem />
      <FlightItem />

      <button className={styles.extraButton}>{'Показать еще'}</button>
    </div>
  )
};
