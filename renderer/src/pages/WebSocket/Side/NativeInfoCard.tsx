import React from 'react';
import styles from '/@/pages/WebSocket/Side/index.module.scss';
import { useAtomValue } from 'jotai/utils';
import { websocketConnAtom } from '/@/store/websocketStore';
import waitImg from '/@/assets/icon/wait_conn.svg';

const NativeInfoCard = () => {
  const ws = useAtomValue(websocketConnAtom);
  if (ws) {
    const url = new URL((ws as WebSocket).url);
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
          <div className={styles.infoVal}>
            {(ws as WebSocket).protocol ? (ws as WebSocket).protocol : '无'}
          </div>
        </div>
        <div className={styles.infoLine}>
          <div className={styles.infoKey}>binaryType:</div>
          <div className={styles.infoVal}>{(ws as WebSocket).binaryType}</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <img src={waitImg} alt={'waitImg'} className={styles.waitImg} />
        <div className={styles.waitText}>等待连接</div>
      </>
    );
  }
};

export default NativeInfoCard;
