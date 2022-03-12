import React from 'react';
import styles from './index.module.scss';

interface ProgressProps {
  desc?: string;
  progress: number;
}

const Progress: React.FC<ProgressProps> = ({ desc = '正在更新', progress }) => {
  return (
    <>
      <p style={{ textAlign: 'center', marginTop: 5 }}>{desc}</p>
      <div className={styles.proCon}>
        {progress && <progress className={styles.progress} max={100} value={progress} />}
      </div>
    </>
  );
};

export default Progress;
