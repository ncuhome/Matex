import React from 'react';
import styles from './index.module.scss';
import { Icon } from 'semantic-ui-react';
import SpeedTest from '/@/pages/ApiTest/SingleTest/Side/SpeedTest';
import clsx from 'clsx';
import SendBtn from '/@/pages/ApiTest/SingleTest/Side/SendBtn';

const CollectSide = () => {
  return (
    <div className={styles.side}>
      <div className={styles.header}>
        <div className={styles.title}>网络测速</div>
        <div className={styles.choice}>
          <div className={styles.iconCon}>
            <Icon name={'feed'} className={styles.icon} />
          </div>
          <div className={clsx([styles.activeChoice, styles.iconCon])}>
            <Icon name={'clock'} className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <SpeedTest />
      </div>
      <SendBtn />
    </div>
  );
};

export default CollectSide;
