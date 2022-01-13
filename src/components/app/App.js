import styles from './App.module.css';

import { Sidebar, FlightsList } from '..';
import { APIContextProvider } from '../../context/apiContext';
import { FiltersContextProvider } from '../../context/filtersContext';

export const App = () => {
  return (
    <APIContextProvider>
      <div className={styles.app}>
        <FiltersContextProvider>
          <Sidebar />
          <FlightsList />
        </FiltersContextProvider>
      </div>
    </APIContextProvider>
  );
}
