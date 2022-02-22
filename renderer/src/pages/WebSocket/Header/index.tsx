import React, { SyntheticEvent } from 'react';
import styles from './index.module.scss';
import { Button, Dropdown, Label } from 'semantic-ui-react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { websocketTypeAtom, websocketUrlAtom } from '/@/store/websocketStore';
import { wsClientOptions } from '/@/model/ws.model';
import { useNativeWs, useNativeWsStatus } from '/@/request/nativeWs';

const clientOptions = wsClientOptions.map((item) => ({
  key: item,
  text: item,
  value: item
}));

const Header = () => {
  const [wsClient, setWsClient] = useAtom(websocketTypeAtom);
  const { connectWs } = useNativeWs();
  const status = useNativeWsStatus();
  const [url, setUrl] = useAtom(websocketUrlAtom);

  const loading = status === 'connecting';
  const connected = status === 'connected';
  const btnText = connected ? '已连接' : '连接';

  const handleChange = (event: SyntheticEvent, { value }: any) => {
    setWsClient(value);
  };

  const doConnect = (e) => {
    connectWs({ url });
  };

  return (
    <div className={styles.header}>
      <Button.Group color="blue">
        <Button>{wsClient}</Button>
        <Dropdown
          className={clsx(['button', 'icon'])}
          onChange={handleChange}
          floating
          options={clientOptions}
          trigger={<></>}
        />
      </Button.Group>
      <input value={url} onChange={(e) => setUrl(e.target.value)} className={styles.input} />
      <Button
        loading={loading}
        disabled={connected}
        onClick={doConnect}
        secondary={!connected}
        size={'large'}
        style={{ marginRight: 15 }}
      >
        {btnText}
      </Button>
    </div>
  );
};

export default Header;
