import React, { useState } from 'react';
import styles from './app.module.scss';
import { RouterAuth } from './router';
import Loading from './components/Loading';
import { IpcRendererEvent } from 'electron';
import useIpcOn from './hooks/useIpcRender';
import { useChannel } from './zustand/store/apiData.store';
import { ChannelData } from './type/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const { setPort, port, cleanPort } = useChannel((state) => state);

  const ipcListener = (e: IpcRendererEvent) => {
    const port = e.ports[0];
    setPort(port);
    port.onmessage = (event) => {
      const { type } = event.data as ChannelData<null>;
      if (type === 'loading') {
        setLoading(false);
        setShow(true);
        port.postMessage({ type, data: 'ok' } as ChannelData<string>);
      }
    };
  };
  useIpcOn({ channel: 'port', listener: ipcListener });

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (loading) {
  //       setLoading(false);
  //       setShow(true);
  //     }
  //   }, 5000);
  // }, []);

  return (
    <div style={{ display: show || loading ? 'flex' : 'none' }} className={styles.app}>
      {!loading ? <RouterAuth /> : <Loading />}
    </div>
  );
}

export default App;
