import { useAPI } from '../../apiContext';
import { useFiltersContext } from '../../filtersContext';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
  const { airlines } = useAPI();
  const {
    activeFilterAirlines,
    filterPrice,
    filterTransfers,
    setActiveFilterAirlines,
    setFilterSort,
    setFilterTransfers,
    setFilterPrice
  } = useFiltersContext();
  const filterAirlines = [];
  const uniqueAirlines = new Set();

  airlines
  .slice()
  .sort((firstAirline, secondAirline) => firstAirline.price.amount - secondAirline.price.amount)
  .forEach(airline => {
    const { uid, caption } = airline.carrier;

    if (!uniqueAirlines.has(uid)) {
      uniqueAirlines.add(uid)
      filterAirlines.push({
        uid,
        caption,
        price: airline.price.amount
      })
    }
  });

  const handleChangeSorting = (event) => {
    setFilterSort(event.target.value);
  }

  const handleChangeFilterTransfers = (event) => {
    const { value, checked } = event.target;

    setFilterTransfers({
      zero: value === 'zero' ? checked : filterTransfers.zero,
      one: value === 'one' ? checked : filterTransfers.one
    })
  }

  const handleChangeFilterPrice = (event, type) => {
    if (event.key === 'Enter') {
      setFilterPrice({
        from: type === 'from' ? parseInt(event.target.value) : filterPrice.from,
        to: type === 'to' ? parseInt(event.target.value) : filterPrice.to
      })
    }
  }
  
  const handleChangeFilterAirlines = (event, uid) => {
    if (event.target.checked) {
      setActiveFilterAirlines(activeFilterAirlines.concat(uid))
    } else {
      setActiveFilterAirlines(activeFilterAirlines.filter(airlineUid => airlineUid !== uid))
    }
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterSorting}>
        <h3 className={styles.filterTitle}>Сортировать</h3>
        <div onChange={handleChangeSorting}>
          <input type="radio" value="ASCENDING" name="sort" />{'-по возрастанию цены'}
          <input type="radio" value="DESCENDING" name="sort" />{'-по убыванию цены'}
          <input type="radio" value="TIME_TRAVEL" name="sort" />{'-по времени в пути'}
        </div>
      </div>

      <div className={styles.filterTransfers}>
        <h3 className={styles.filterTitle}>Фильтровать</h3>
        <input
          type="checkbox"
          value={'one'}
          name="transfer"
          onChange={handleChangeFilterTransfers}
        />
        {'- 1 пересадка'}
        <input
          type="checkbox"
          value={'zero'}
          name="transfer"
          onChange={handleChangeFilterTransfers}
        />
        {'- без пересадок'}
      </div>

      <div className={styles.filterPrice}>
        <h3 className={styles.filterTitle}>Цена</h3>
        <input onKeyPress={(event) => handleChangeFilterPrice(event, 'from')} />
        <input onKeyPress={(event) => handleChangeFilterPrice(event, 'to')} />
      </div>

      <div className={styles.filterAirlines}>
        <h3 className={styles.filterTitle}>Авиакомпании</h3>
        
        {filterAirlines.map(airline => (
          <label key={airline.uid}>
            <input
              type="checkbox"
              value={airline.caption}
              onChange={(event) => handleChangeFilterAirlines(event, airline.uid)}
            />
            {airline.caption}
          </label>
        ))}
      </div>
    </div>
  )
};
