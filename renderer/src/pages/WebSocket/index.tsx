import React from 'react';
import styles from './index.module.scss';
import WsSide from '/@/pages/WebSocket/Side';

const WebSocketPage = () => {
  return (
    <div className={styles.webSocket}>
      <div className={styles.chat}></div>
      <div className={styles.side}>
        <WsSide />
      </div>
    </div>
  );
};

export default WebSocketPage;
