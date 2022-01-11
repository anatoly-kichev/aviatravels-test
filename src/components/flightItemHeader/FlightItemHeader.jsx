import styles from './FlightItemHeader.module.css';

export const FlightItemHeader = () => {
  return (
    <div className={styles.header}>
      <img className={styles.carrierLogo} alt={'Carrier Logo'} />
      <div className={styles.priceBlock}>
        <div className={styles.price}>
          {'20000 ₽'}
        </div>
        <div className={styles.priceDescription}>
          {'Стоимость для одного взрослого человека'}
        </div>
      </div>
    </div>
  );
};
