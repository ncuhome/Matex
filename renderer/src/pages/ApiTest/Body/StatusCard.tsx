import React, { Fragment } from 'react';
import styles from './index.module.scss';
import { Icon, Popup } from 'semantic-ui-react';
import { useAtomValue } from 'jotai/utils';
import { apiTestResDataAtom } from '/@/store/apiTestStore';
import clsx from 'clsx';

interface Timer {
  key: string;
  value: number | undefined;
}

export const StatusCard = () => {
  const resData = useAtomValue(apiTestResDataAtom);

  const renderTiming = () => {
    const timeList: Timer[] = [];
    for (const key in resData!.timer) {
      // @ts-ignore
      timeList.push({ key: key, value: resData.timer[key] });
    }
    return (
      <div className={styles.timing}>
        {timeList.map((item) => {
          const isTotal = item.key === 'total';
          return (
            <Fragment key={item.key}>
              <div className={clsx([isTotal && styles.totalLine, styles.timingLine])}>
                <div className={styles.name}>{item.key}</div>
                <div className={styles.progressCon}>
                  <progress
                    className={clsx([styles.progress, isTotal && styles.total])}
                    max={resData!.timer.total}
                    value={item.value ?? 0}
                  />
                </div>
                <div className={clsx([styles.time])}>{item.value ?? 0}ms</div>
              </div>
            </Fragment>
          );
        })}
      </div>
    );
  };

  if (resData) {
    const color = getColor(resData.statusCode);
    return (
      <div className={styles.statusCard} style={{ color }}>
        <div className={styles.statusCode}>{resData.statusCode}</div>
        <div className={styles.statusDesc}>{resData.desc}</div>
        <div className={styles.statusSize}>{resData.size}</div>
        <div className={styles.statusTiming}>
          <Popup on={'click'} position={'top center'} trigger={<Icon name="clock" />}>
            {renderTiming()}
          </Popup>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const getColor = (statusCode: number) => {
  if (statusCode < 200) {
    return '#C6C7C9';
  } else if (statusCode >= 200 && statusCode < 300) {
    return '#2CB5AD';
  } else if (statusCode >= 300 && statusCode < 400) {
    return '#6DF9F9';
  } else if (statusCode >= 400 && statusCode < 500) {
    return '#FB9069';
  } else {
    return '#F73C3C';
  }
};
