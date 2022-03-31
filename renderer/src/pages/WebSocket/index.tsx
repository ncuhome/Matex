import React from 'react';
import styles from './index.module.scss';
import MsgWin from '/@/pages/WebSocket/MsgWin';
import RightInfo from '/@/pages/WebSocket/RightInfo';

const WebSocketPage = () => {
  return (
    <div className={styles.webSocket}>
      <div className={styles.left}>
        <MsgWin />
      </div>
      <div className={styles.right}>
        <RightInfo />
      </div>
    </div>
  );
};

export default WebSocketPage;
