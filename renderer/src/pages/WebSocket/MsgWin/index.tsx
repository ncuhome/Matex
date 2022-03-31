import React from 'react';
import styles from './index.module.scss';
import MsgWinHeader from '/@/pages/WebSocket/MsgWin/Header';
import MsgWinBody from '/@/pages/WebSocket/MsgWin/Body';
import MsgWinFooter from '/@/pages/WebSocket/MsgWin/Footer';

const LeftWin = () => {
  return (
    <div className={styles.leftWin}>
      <div className={styles.header}>
        <MsgWinHeader />
      </div>
      <div className={styles.body}>
        <MsgWinBody />
      </div>
      <div className={styles.footer}>
        <MsgWinFooter />
      </div>
    </div>
  );
};

export default LeftWin;
