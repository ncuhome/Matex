import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

interface LoadingProps {
  bgColor?: string;
}

const Loading: React.FC<LoadingProps> = ({ bgColor = 'var(--dark-bg1)' }) => {
  return (
    <div className={styles.con} style={{ background: bgColor }}>
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
