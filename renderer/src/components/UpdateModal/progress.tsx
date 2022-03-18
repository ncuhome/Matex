import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

interface ProgressProps {
  desc?: string;
  progress: number;
}

const Progress: React.FC<ProgressProps> = ({ progress }) => {
  const strokeDashoffset = 301 - (301 * progress) / 100;
  return (
    <>
      <div className={clsx([styles.progressBox])}>
        <svg className={styles.progress}>
          <defs>
            <radialGradient id="gradient" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
              <stop offset="40%" stopColor="var(--primary-dark)" />
              <stop offset="100%" stopColor="var(--primary-light)" />
            </radialGradient>
          </defs>
          <circle
            className={styles.svgCircle}
            style={{ strokeDashoffset }}
            cx="70"
            cy="70"
            r="48"
            stroke="url(#gradient)"
            id="circle"
          />
        </svg>
        <div className={styles.circle} />
        <div className={clsx([styles.circle, styles.circleMedium])} />
        <div className={clsx([styles.circle, styles.circleSmall])} />
        <div className={styles.cardNumber}>
          <div className={styles.GPAText}>进度</div>
          <div className={styles.pointsText}>{progress + '%'}</div>
        </div>
      </div>
    </>
  );
};

export default Progress;
