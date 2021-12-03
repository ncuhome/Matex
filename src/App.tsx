import React, { useEffect, useState } from 'react';
import styles from './app.module.scss';
import { RouterAuth } from './router';
import Loading from './components/Loading';
import { IpcRendererEvent } from 'electron';
import useIpcOn from './hooks/useIpcRender';

function App() {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  const ipcListener = (e: IpcRendererEvent) => {
    const port = e.ports[0];
    port.onmessage = (event: { data: { loading: boolean } }) => {
      const { loading } = event.data as { loading: boolean };
      if (!loading) {
        setLoading(false);
        setTimeout(() => {
          setShow(true);
        }, 50);
      }
    };
  };
  useIpcOn({ channel: 'port', listener: ipcListener });

  useEffect(() => {
    setTimeout(() => {
      if (loading) {
        setLoading(false);
        setTimeout(() => {
          setShow(true);
        }, 50);
      }
    }, 5000);
  }, []);
  return (
    <div style={{ display: show || loading ? 'flex' : 'none' }} className={styles.app}>
      {!loading ? <RouterAuth /> : <Loading />}
    </div>
  );
}

export default App;
