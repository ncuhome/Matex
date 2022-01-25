import React from 'react';
import styles from './app.module.scss';
import { RouterAuth } from './router';
import useIpcOn from './hooks/useIpcRender';

function App() {
  const ipcListener = (e: any) => {
    window.MessagePort = e.ports[0];
  };
  useIpcOn({ channel: 'port', listener: ipcListener });
  return (
    <div className={styles.app}>
      <RouterAuth />
    </div>
  );
}

export default App;
