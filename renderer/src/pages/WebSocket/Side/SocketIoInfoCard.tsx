import React from 'react';
import { useAtomValue } from 'jotai/utils';
import { websocketConnAtom, websocketUrlAtom } from '/@/store/websocketStore';
import styles from '/@/pages/WebSocket/Side/index.module.scss';
import waitImg from '/@/assets/icon/wait_conn.svg';
import { useSocketIoInfo } from '/@/request/socketIo';
import { WsSocketIo } from '/@/type/websocketPage';

const SocketIoInfoCard = () => {
  const ws = useAtomValue(websocketConnAtom) as WsSocketIo;
  const [id] = useSocketIoInfo();
  console.log(id);
  if (ws) {
    const url = new URL(ws.io.uri);
    const nsp = ws.nsp;
    return (
      <>
        <h4 className={styles.infoTitle}>连接信息</h4>
        <div className={styles.infoLine}>
          <div className={styles.infoKey}>type：</div>
          <div className={styles.infoVal}>{'socketio'}</div>
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
          <div className={styles.infoKey}>nsp:</div>
          <div className={styles.infoVal}>{nsp}</div>
        </div>
        <div className={styles.infoLine}>
          <div className={styles.infoKey}>id:</div>
          <div className={styles.infoVal} style={{ fontSize: 12.5 }}>
            {id}
          </div>
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

export default SocketIoInfoCard;
