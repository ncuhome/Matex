import React, { useEffect, useState } from 'react';
import styles from './app.module.scss';
import Loading from './components/Loading';
import { RouterAuth } from './router';
function App() {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    (async () => {
      const { ipcRenderer } = require('electron');
      ipcRenderer.on('port', (e) => {
        const port = e.ports[0];
        port.onmessage = (event) => {
          const { loading } = event.data as { loading: boolean };
          if (!loading) {
            setLoading(false);
            setTimeout(() => {
              setShow(true);
            }, 100);
          }
        };
      });
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (loading) {
        setLoading(false);
        setTimeout(() => {
          setShow(true);
        }, 100);
      }
    }, 5000);
  }, []);
  console.log(loading);
  return (
    <div style={{ display: show || loading ? 'flex' : 'none' }} className={styles.app}>
      {!loading ? <RouterAuth /> : <Loading />}
    </div>
  );
}

export default App;
