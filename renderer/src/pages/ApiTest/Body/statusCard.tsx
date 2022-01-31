import React from 'react';
import styles from './index.module.scss';
import { Button, Icon } from 'semantic-ui-react';

export const StatusCard = () => {
  return (
    <div className={styles.statusCard}>
      <div className={styles.statusCode}>200</div>
      <div className={styles.statusDesc}>Permanent Redirect</div>
      <div className={styles.statusTiming}>
        <Icon name="clock" />
      </div>
    </div>
  );
};
