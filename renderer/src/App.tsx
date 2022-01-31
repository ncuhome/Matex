import React from 'react';
import styles from './app.module.scss';
import { RouterAuth } from './router';
import useIpcOn from './hooks/useIpcOn';

function App() {
  const ipcListener = (e: any) => {
    window.MessagePort = e.ports[0];
  };
  useIpcOn('port', ipcListener);
  return (
    <div className={styles.app}>
      <RouterAuth />
    </div>
  );
}

export default App;
