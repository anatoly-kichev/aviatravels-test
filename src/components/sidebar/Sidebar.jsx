import { useAPI } from '../../context/apiContext';
import { useFiltersContext } from '../../context/filtersContext';
import cn from 'classnames';
import styles from './Sidebar.module.css';
import { useState } from 'react';

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

  const [inputPrice, setInputPrice] = useState({
    from: filterPrice.from,
    to: filterPrice.to
  });

  const handleChangeInputPrice = (event, type) => {
    setInputPrice({
      from: type === 'from' ? event.target.value: inputPrice.from,
      to: type === 'to' ? event.target.value: inputPrice.to
    })
  };

  const handleChangeSorting = (event) => {
    setFilterSort(event.target.value);
  };

  const handleChangeFilterTransfers = (event) => {
    const { value, checked } = event.target;

    setFilterTransfers({
      zero: value === 'zero' ? checked : filterTransfers.zero,
      one: value === 'one' ? checked : filterTransfers.one
    })
  };

  const handleKeyPressFilterPrice = (event, type) => {
    if (event.key === 'Enter') {
      setFilterPrice({
        from: type === 'from' ? parseInt(event.target.value) : filterPrice.from,
        to: type === 'to' ? parseInt(event.target.value) : filterPrice.to
      })
    }
  };

  const handleBlurFilterPrice = () => {
    setFilterPrice({
        from: parseInt(inputPrice.from),
        to: parseInt(inputPrice.to)
      })
  }
  
  const handleChangeFilterAirlines = (event, uid) => {
    if (event.target.checked) {
      setActiveFilterAirlines(activeFilterAirlines.concat(uid))
    } else {
      setActiveFilterAirlines(activeFilterAirlines.filter(airlineUid => airlineUid !== uid))
    }
  };

  return (
    <div className={styles.sidebar}>
        <div>
          <h3 className={styles.filterTitle}>Сортировать</h3>
          <div className={styles.inputFields} onChange={handleChangeSorting}>
            <label>
              <input type="radio" value="ASCENDING" name="sort" />
              {' - по возрастанию цены'}
            </label>
            <label>
              <input type="radio" value="DESCENDING" name="sort" />
              {' - по убыванию цены'}
            </label>
            <label>
              <input type="radio" value="TIME_TRAVEL" name="sort" />
              {' - по времени в пути'}
            </label>
          </div>
        </div>

        <div>
          <h3 className={styles.filterTitle}>Фильтровать</h3>
          <div className={styles.inputFields}>
            <label>
              <input
                type="checkbox"
                value={'one'}
                name="transfer"
                onChange={handleChangeFilterTransfers}
              />
              {' - 1 пересадка'}
            </label>
            <label>
              <input
                type="checkbox"
                value={'zero'}
                name="transfer"
                onChange={handleChangeFilterTransfers}
              />
              {' - без пересадок'}
            </label>
          </div>
        </div>

        <div>
          <h3 className={styles.filterTitle}>Цена</h3>
          <div className={styles.inputFields}>
            <label>
              {'От '}
              <input
                type="number"
                onKeyPress={(event) => handleKeyPressFilterPrice(event, 'from')}
                onChange={(event) => handleChangeInputPrice(event, 'from')}
                onBlur={handleBlurFilterPrice}
                value={inputPrice.from}
              />
            </label>
            <label>
              {'До '}
              <input
                type="number"
                onKeyPress={(event) => handleKeyPressFilterPrice(event, 'to')}
                onChange={(event) => handleChangeInputPrice(event, 'to')}
                onBlur={handleBlurFilterPrice}
                value={inputPrice.to}
              />
            </label>
          </div>
        </div>

        <div>
          <h3 className={styles.filterTitle}>Авиакомпании</h3>
          <div className={cn(styles.inputFields, styles.airlinesInputs)}>
            {filterAirlines.map(airline => (
              <label key={airline.uid}>
                <input
                  type="checkbox"
                  value={airline.caption}
                  onChange={(event) => handleChangeFilterAirlines(event, airline.uid)}
                />
                {' - '}
                <span>{airline.caption}</span>
                {` от ${airline.price} р.`}
              </label>
            ))}
          </div>
        </div>
    </div>
  )
};
