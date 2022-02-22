import React, { SyntheticEvent } from 'react';
import styles from './index.module.scss';
import { Button, Dropdown, Label } from 'semantic-ui-react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { websocketTypeAtom } from '/@/store/websocketStore';
import { wsClientOptions } from '/@/model/ws.model';
import { useNativeWs } from '/@/request/nativeWs';

const clientOptions = wsClientOptions.map((item) => ({
  key: item,
  text: item,
  value: item
}));

const Header = () => {
  const [wsClient, setWsClient] = useAtom(websocketTypeAtom);
  const { connectWs } = useNativeWs();

  const handleChange = (event: SyntheticEvent, { value }: any) => {
    setWsClient(value);
  };

  const doConnect = (e) => {
    console.log('do connect');
    connectWs({ url: 'ws://localhost:8080' });
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
      <input className={styles.input} />
      <Button onClick={doConnect} color={'black'} size={'large'} style={{ marginRight: 15 }}>
        连接
      </Button>
    </div>
  );
};

export default Header;
