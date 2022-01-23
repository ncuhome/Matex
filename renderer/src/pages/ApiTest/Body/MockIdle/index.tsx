import React from 'react';
import star from '../../../../assets/icon/form_idle.svg';
import styles from './index.module.scss';

const MockIdle = () => {
  return (
    <div className={styles.con}>
      <img src={star} className={styles.idleImg} />
      {/*<h1 className={styles.title}>ApiTest Server</h1>*/}
    </div>
  );
};

export default MockIdle;
