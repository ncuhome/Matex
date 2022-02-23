import React from 'react';
import styles from './index.module.scss';
import { Icon } from 'semantic-ui-react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { websocketSideAtom, websocketTypeAtom } from '/@/store/websocketStore';
import { useAtomValue } from 'jotai/utils';
import waitImg from '/@/assets/icon/wait_conn.svg';
import NativeInfoCard from '/@/pages/WebSocket/Side/NativeInfoCard';
import SocketIoInfoCard from '/@/pages/WebSocket/Side/SocketIoInfoCard';

const WsSide = () => {
  const [wsSide, setWsSide] = useAtom(websocketSideAtom);
  const wsType = useAtomValue(websocketTypeAtom);
  const isClient = wsSide === 'client';

  const changeSide = (client: boolean) => {
    if (client) {
      !isClient && setWsSide('client');
    } else {
      isClient && setWsSide('server');
    }
  };

  const renderInfoCard = () => {
    if (wsType === 'native') {
      return <NativeInfoCard />;
    } else {
      return <SocketIoInfoCard />;
    }
  };

  return (
    <div className={styles.side}>
      <div className={styles.sideType}>
        <div className={styles.iconCon}>
          <Icon name={isClient ? 'desktop' : 'server'} size={'massive'} className={styles.icon} />
        </div>
        <div className={styles.btnGroup}>
          <div className={clsx([styles.btn, isClient && styles.activeBtn])} onClick={() => changeSide(true)}>
            客户端
          </div>
          <div
            className={clsx([styles.btn, !isClient && styles.activeBtn])}
            onClick={() => changeSide(false)}
          >
            服务端
          </div>
        </div>
      </div>
      <div className={styles.infoCon}>{renderInfoCard()}</div>
    </div>
  );
};

export default WsSide;
