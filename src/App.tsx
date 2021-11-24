import React, { useEffect, useState } from 'react';
import { RouterAuth } from './router';
import Loading from './components/Loading';
import styles from './app.module.scss';

function App() {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
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
  }, []);
  console.log(loading);
  return (
    <div style={{ display: show || loading ? 'block' : 'none' }} className={styles.app}>
      {!loading ? <RouterAuth /> : <Loading />}
    </div>
  );
}

export default App;
