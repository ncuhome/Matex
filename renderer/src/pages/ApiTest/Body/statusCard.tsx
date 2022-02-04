import React, { Fragment } from 'react';
import styles from './index.module.scss';
import { Icon, Popup } from 'semantic-ui-react';
import { useAtomValue } from 'jotai/utils';
import { apiTestResDataAtom } from '/@/store/apiTestStore';

interface Timer {
  key: string;
  value: number | undefined;
}

export const StatusCard = () => {
  const resData = useAtomValue(apiTestResDataAtom);

  const renderTiming = () => {
    console.log(resData!.timer.total);
    const timeList: Timer[] = [];
    for (const key in resData!.timer) {
      console.log(key);
      // @ts-ignore
      timeList.push({ key, value: resData.timer[key] });
    }
    return (
      <div className={styles.timing}>
        {timeList.map((item) => {
          return (
            <Fragment key={item.key}>
              <div className={styles.timingLine}>
                <div className={styles.name}>{item.key}</div>
                <div className={styles.progressCon}>
                  <progress className={styles.progress} max={resData!.timer.total} value={item.value ?? 0} />
                </div>
                <div className={styles.time}>{item.value ?? 0}ms</div>
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
