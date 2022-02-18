import React from 'react';
import styles from './index.module.scss';
import { Icon } from 'semantic-ui-react';
import clsx from 'clsx';

const WsSide = () => {
  return (
    <div className={styles.side}>
      <div className={styles.option}>
        <div className={clsx([styles.choice, styles.activeChoice])}>
          <Icon name="tv" size={'large'} className={styles.icon} />
          <div className={styles.desc}>客户端</div>
        </div>
        <div className={styles.choice}>
          <Icon name="server" size={'large'} className={styles.icon} />
          <div className={styles.desc}>服务端</div>
        </div>
      </div>
    </div>
  );
};

export default WsSide;
