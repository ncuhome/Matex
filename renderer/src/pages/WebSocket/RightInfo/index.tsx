import React from 'react';
import styles from './index.module.scss';
import TopForm from '/@/pages/WebSocket/RightInfo/TopForm';
import BottomDesc from '/@/pages/WebSocket/RightInfo/BottomDesc';

const RightInfo = () => {

  return (
    <div className={styles.rightInfo}>
      <div className={styles.top}>
        <TopForm />
      </div>
      <div className={styles.bottomDesc}>
        <BottomDesc />
      </div>
    </div>
  );
};

export default RightInfo;
