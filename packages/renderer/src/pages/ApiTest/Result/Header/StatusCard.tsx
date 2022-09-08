import React from 'react';
import styles from './statusCard.module.scss';
import TimeIcon from '/@cmp/svg/TimeIcon';
import Popup from '/@cmp/Popup';
import TimeCost from '/@/pages/ApiTest/Result/Header/TimeCost';

interface Timer {
  key: string;
  value: number | undefined;
}

export const StatusCard = () => {
  return (
    <div className={styles.statusCard}>
      <div className={styles.statusCode}>{200}</div>
      <div className={styles.statusDesc}>{'Not Found'}</div>
      <div className={styles.statusTiming}>
        <Popup trigger={<TimeIcon fill={'#2cb5ad'} transform={'scale(1.2)'} />}>
          <TimeCost />
        </Popup>
      </div>
      <div className={styles.statusSize}>{'22kb'}</div>
    </div>
  );
};

const getColor = (statusCode: number) => {
  if (statusCode < 200) {
    return '#C6C7C9';
  } else if (statusCode >= 200 && statusCode < 300) {
    return '#3FDA0D';
  } else if (statusCode >= 300 && statusCode < 400) {
    return '#6DF9F9';
  } else if (statusCode >= 400 && statusCode < 500) {
    return '#FB9069';
  } else {
    return '#F73C3C';
  }
};
