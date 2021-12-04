import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

const Loading = ({ showBg = true }: { showBg?: boolean }) => {
  return (
    <div className={styles.con} style={{ backgroundColor: showBg ? '#1d2630' : 'transparent' }}>
      <div className={styles.spinnerBox}>
        <div className={clsx([styles.blueOrbit, styles.leo])} />
        <div className={clsx([styles.greenOrbit, styles.leo])} />
        <div className={clsx([styles.redOrbit, styles.leo])} />
        <div className={clsx([styles.whiteOrbit, styles.leo, styles.w1])} />
        <div className={clsx([styles.whiteOrbit, styles.leo, styles.w2])} />
        <div className={clsx([styles.whiteOrbit, styles.leo, styles.w3])} />
      </div>
    </div>
  );
};

export default Loading;
