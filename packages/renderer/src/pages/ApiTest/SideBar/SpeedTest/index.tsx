import React from 'react';
import SpeedDashboard from '/@cmp/SpeedDashboard';
import styles from './index.module.scss';
import UploadIcon from '/@cmp/svg/UploadIcon';
import DownloadIcon from '/@cmp/svg/DownloadIcon';
import TimeIcon from "/@cmp/svg/TimeIcon";

const SpeedTest = () => {
  return (
    <div className={styles.speedTest}>
      <div className={styles.dashboard}>
        <SpeedDashboard />
      </div>
      <div className={styles.speedData}>
        <div className={styles.dataItem}>
          <div className={styles.title}>
            <DownloadIcon fill={'var(--light-text1)'} />
            下载速度
          </div>
          <div className={styles.number}>35.8Mb/S</div>
        </div>
				<div className={styles.dataItem}>
					<div className={styles.title}>
						<UploadIcon fill={'var(--light-text1)'} />
						上传速度
					</div>
					<div className={styles.number}>35.8Mb/S</div>
				</div>
				<div className={styles.dataItem}>
					<div className={styles.title}>
						<TimeIcon fill={'var(--light-text1)'} />
						平均延迟
					</div>
					<div className={styles.number}>35.8ms</div>
				</div>
      </div>
    </div>
  );
};

export default SpeedTest;
