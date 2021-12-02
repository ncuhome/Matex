import React from 'react';
import styles from './index.module.scss';
import { Colors } from './theme';

interface CircleProgressProps {
  theme: 'blue' | 'red' | 'orange' | 'green';
}

const CircleProgress: React.FC<CircleProgressProps> = (props) => {
  const { theme } = props;
  const colors = Colors[theme];
  const strokeDashoffset = 220 - (220 * 2) / 4;
  return (
    <div className={styles.cardPercent}>
      <svg className={styles.percentSvg}>
        <defs>
          <radialGradient id="gradient" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
            <stop offset="30%" stopColor={colors.background[0]} />
            <stop offset="100%" stopColor={colors.background[1]} />
          </radialGradient>
        </defs>
        <circle
          className={styles.svgCircle}
          style={{ strokeDashoffset }}
          cx="40"
          cy="40"
          r="35"
          stroke="url(#gradient)"
          id="circle"
        />
      </svg>
      <div className={styles.circleLine} style={{ borderColor: colors.lineColor }} />
      <div className={styles.count}>8</div>
    </div>
  );
};

export default CircleProgress;
