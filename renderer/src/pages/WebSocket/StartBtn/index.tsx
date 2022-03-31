import React from 'react';
import styles from './index.module.scss';

const StartBtn = () => {
  return (
    <div className={styles.startBtn}>
      <div className={styles.ring}>
        <div className={styles.text}>启动</div>
      </div>
    </div>
  );
};

export default StartBtn;
