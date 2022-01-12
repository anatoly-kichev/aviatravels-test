import styles from './FlightItemHeader.module.css';

export const FlightItemHeader = ({ price, carrier }) => {
  return (
    <div className={styles.header}>
      <div className={styles.carrier}>
        <span>{carrier}</span>
      </div>
      <div className={styles.priceBlock}>
        <div className={styles.price}>
          {`${price} ₽`}
        </div>
        <div className={styles.priceDescription}>
          {'Стоимость для одного взрослого человека'}
        </div>
      </div>
    </div>
  );
};
