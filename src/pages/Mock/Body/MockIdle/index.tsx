import React from 'react';
import star from '../../../../assets/icon/star.svg';
import styles from './index.module.scss';

const MockIdle = () => {
  return (
    <div>
      <img src={star} className={styles.idleImg} />
      <h1 className={styles.title}>Mock Server</h1>
    </div>
  );
};

export default MockIdle;
