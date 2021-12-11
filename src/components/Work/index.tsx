import React from 'react';
import styles from './index.module.scss';
import workImg from '../../assets/icon/work.svg';

const WaitWorkPage = () => {
  return (
    <div className={styles.con}>
      <img src={workImg} alt={''} className={styles.img} />
      <h3 className={styles.text}>敬请期待!</h3>
    </div>
  );
};

export default WaitWorkPage;
