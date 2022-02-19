import React from 'react';
import styles from './index.module.scss';
import WsSide from '/@/pages/WebSocket/Side';
import Header from './Header';
import Body from '/@/pages/WebSocket/Body';

const WebSocketPage = () => {
  return (
    <div className={styles.webSocket}>
      <div className={styles.chat}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.body}>
          <Body />
        </div>
      </div>
      <div className={styles.side}>
        <WsSide />
      </div>
    </div>
  );
};

export default WebSocketPage;
