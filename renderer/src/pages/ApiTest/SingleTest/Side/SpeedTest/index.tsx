import React from 'react';
import Progress from './Progress';
import styles from './index.module.scss';
import clsx from 'clsx';

const SpeedTest = () => {
  return (
    <div className={styles.con}>
      <div className={styles.progress}>
        <Progress progress={60} />
      </div>
      <div className={styles.statistic}>
        <div className={clsx([styles.line, styles.download])}>
          <div>下载速度</div>
          <div>10mb/s</div>
        </div>
        <div className={clsx([styles.line, styles.upload])}>
          <div>上传速度</div>
          <div>6mb/s</div>
        </div>
        <div className={clsx([styles.line, styles.defer])}>
          <div>平均延迟</div>
          <div>20ms</div>
        </div>
      </div>
    </div>
  );
};

export default SpeedTest;
