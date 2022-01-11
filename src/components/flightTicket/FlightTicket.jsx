import styles from './FlightTicket.module.css';

export const FlightTicket = () => {
  return (
    <div className={styles.ticket}>
      <div className={styles.direction}>
        <span className={styles.city}>{'Москва, Шереметьево '}</span>
        <span className={styles.airport}>{'(SVO) '}</span>
        <span className={styles.arrow}>&#8594;</span>
        <span className={styles.city}>{' Лондон, Хитроу '}</span>
        <span className={styles.airport}>{'(LHR) '}</span>
      </div>

      <div className={styles.timeBlock}>
        <div className={styles.timeBlockItem}>
          <span className={styles.time}>{'20:40 '}</span>
          <span className={styles.date}>{'18 авг. вт'}</span>
        </div>

        <div className={styles.timeBlockItem}>
          <span className={styles.durationIcon}></span>
          <span className={styles.duration}>{'14 ч 45 мин'}</span>
        </div>

        <div className={styles.timeBlockItem}>
          <span className={styles.date}>{'18 авг. вт'}</span>
          <span className={styles.time}>{' 20:40'}</span>
        </div>
      </div>

      <div className={styles.transfers}>
        <span>{'1 пересадка'}</span>
      </div>

      <div className={styles.flightDescription}>
        {'Рейс выполняет: LOT Polish Airlines'}
      </div>
    </div>
  )
};
