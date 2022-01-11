import styles from './App.module.css';

import { Sidebar, FlightsList } from '..';

export const App = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <FlightsList />
    </div>
  );
}
