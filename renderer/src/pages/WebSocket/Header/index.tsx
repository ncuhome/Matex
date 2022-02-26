import React, { SyntheticEvent, useRef } from 'react';
import styles from './index.module.scss';
import { Button, Dropdown, Label } from 'semantic-ui-react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useMsgList, websocketConnAtom, websocketTypeAtom, websocketUrlAtom } from '/@/store/websocketStore';
import { wsClientOptions } from '/@/model/ws.model';
import { useNativeWs, useNativeWsStatus } from '/@/request/nativeWs';
import { useSocketIo } from '/@/request/socketIo';
import { useAtomValue } from 'jotai/utils';
import dropdownStyle from '/@/style/apitest/index.module.scss';

const clientOptions = wsClientOptions.map((item) => ({
  key: item,
  text: item,
  value: item
}));

const Header = () => {
  const [wsClient, setWsClient] = useAtom(websocketTypeAtom);
  const { connectWs, closeWs } = useNativeWs();
  const { closeSocketIo, connSocketIo } = useSocketIo();
  const status = useNativeWsStatus();
  const [url, setUrl] = useAtom(websocketUrlAtom);
  const wsType = useAtomValue(websocketTypeAtom);
  const { clearList } = useMsgList();
  const [ws, setWs] = useAtom(websocketConnAtom);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const connected = status === 'connected';
  const btnText = connected ? '已连接' : '连接';

  const conn = wsType === 'native' ? connectWs : connSocketIo;

  const handleChange = (event: SyntheticEvent, { value }: any) => {
    if (ws) {
      if (wsClient === 'socket.io') {
        closeSocketIo();
      } else {
        closeWs();
      }
      setWs(undefined);
    }
    setWsClient(value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = undefined;
      clearList();
    }, 0);
  };

  const doConnect = (e) => {
    conn({ url });
  };

  return (
    <div className={styles.header}>
      <Button.Group className={dropdownStyle.dropDown} color="blue">
        <Button className={dropdownStyle.btn}>{wsClient}</Button>
        <Dropdown
          className={clsx(['button', 'icon', dropdownStyle.select])}
          onChange={handleChange}
          floating
          options={clientOptions}
          trigger={<></>}
        />
      </Button.Group>
      <input value={url} onChange={(e) => setUrl(e.target.value)} className={styles.input} />
      <button
        // loading={loading}
        disabled={connected}
        onClick={doConnect}
        className={styles.sendBtn}
        // secondary={!connected}
        // size={'large'}
        style={{ marginRight: 15 }}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Header;
