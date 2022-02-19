import React from 'react';
import styles from './index.module.scss';
import { Icon } from 'semantic-ui-react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { websocketClientAtom } from '/@/store/websocketStore';

const WsSide = () => {
  const [isClient, setClient] = useAtom(websocketClientAtom);

  const handleBtnClick = (client: boolean) => {
    if (client) {
      !isClient && setClient(true);
    } else {
      isClient && setClient(false);
    }
  };

  return (
    <div className={styles.side}>
      <div className={styles.sideType}>
        <div className={styles.iconCon}>
          <Icon name={isClient ? 'tv' : 'server'} size={'massive'} className={styles.icon} />
        </div>
        <div className={styles.btnGroup}>
          <div
            className={clsx([styles.btn, isClient && styles.activeBtn])}
            onClick={() => handleBtnClick(true)}
          >
            客户端
          </div>
          <div
            className={clsx([styles.btn, !isClient && styles.activeBtn])}
            onClick={() => handleBtnClick(false)}
          >
            服务端
          </div>
        </div>
      </div>
    </div>
  );
};

export default WsSide;
