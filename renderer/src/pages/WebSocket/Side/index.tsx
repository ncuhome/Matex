import React from 'react';
import styles from './index.module.scss';
import { Icon } from 'semantic-ui-react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { websocketNativeConnAtom, websocketSideAtom } from '/@/store/websocketStore';
import { useAtomValue } from 'jotai/utils';
import waitImg from '/@/assets/icon/wait_conn.svg';

const WsSide = () => {
  const [wsSide, setWsSide] = useAtom(websocketSideAtom);
  const ws = useAtomValue(websocketNativeConnAtom);

  const isClient = wsSide === 'client';

  const changeSide = (client: boolean) => {
    if (client) {
      !isClient && setWsSide('client');
    } else {
      isClient && setWsSide('server');
    }
  };

  const renderInfoCard = () => {
    if (ws) {
      const url = new URL(ws.url);
      console.log(url);
      return (
        <>
          <h4 className={styles.infoTitle}>连接信息</h4>
          <div className={styles.infoLine}>
            <div className={styles.infoKey}>type：</div>
            <div className={styles.infoVal}>{'native'}</div>
          </div>
          <div className={styles.infoLine}>
            <div className={styles.infoKey}>hostname：</div>
            <div className={styles.infoVal}>{url.hostname}</div>
          </div>
          <div className={styles.infoLine}>
            <div className={styles.infoKey}>port:</div>
            <div className={styles.infoVal}>{url.port}</div>
          </div>
          <div className={styles.infoLine}>
            <div className={styles.infoKey}>protocols:</div>
            <div className={styles.infoVal}>{ws.protocol ? ws.protocol : '无'}</div>
          </div>
          <div className={styles.infoLine}>
            <div className={styles.infoKey}>binaryType:</div>
            <div className={styles.infoVal}>{ws.binaryType}</div>
          </div>
        </>
      );
    }
    return (
      <>
        <img src={waitImg} alt={'waitImg'} className={styles.waitImg} />
        <div className={styles.waitText}>等待连接</div>
      </>
    );
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
