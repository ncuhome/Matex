import React from 'react';
import styles from './index.module.scss';

interface ProgressProps {
  desc?: string;
  progress: number;
}

const Progress: React.FC<ProgressProps> = ({ desc = '正在更新...', progress }) => {
  return (
    <>
      <div className={styles.desc}>{desc}</div>
      <div className={styles.proCon}>
        {progress && (
          <>
            <progress className={styles.progress} max={100} value={progress} />
            <span>
              12.5m &nbsp;<span style={{ color: 'blue' }}>/</span> &nbsp;30.3m
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default Progress;
