import React, { useEffect, useState } from 'react';
import styles from './app.module.scss';
import { RouterAuth } from './router';
import useIpcOn from './hooks/useIpcOn';
import { Toaster } from 'react-hot-toast';
import { useBeforeQuit } from '/@/hooks/useBeforeQuit';
import Loading from '/@cmp/Loading';
import { MatexWin } from '/@/global';

function App() {
  useBeforeQuit();

  const [loading, setLoading] = useState(true);
  const ipcListener = (e: any) => {
    window.MessagePort = e.ports[0];
  };
  useEffect(() => {
    setTimeout(() => {
      MatexWin.ipc?.send('loading', '');
      setLoading(false);
    }, 6000);
  });

  useIpcOn('port', ipcListener);
  return (
    <>
      <Toaster />
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.app}>
          <RouterAuth />
        </div>
      )}
    </>
  );
}

export default App;
