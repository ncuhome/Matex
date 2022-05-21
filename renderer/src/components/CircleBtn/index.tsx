import React from 'react';
import styles from './index.module.scss';

const CircleBtn = () => {
  return (
    <div className={styles.startBtn}>
      <div className={styles.normal}>
        <div className={styles.text}>{'发送'}</div>
      </div>
    </div>
  );
};

export default CircleBtn;
