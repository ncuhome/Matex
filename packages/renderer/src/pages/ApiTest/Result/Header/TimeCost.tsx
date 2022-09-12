import React from 'react';
import styles from './statusCard.module.scss';
import { useAtomValue } from 'jotai';
import { ResultAtom } from '/@/store/ApiTest/result.store';
import { ApiTestRes, ExactRes } from '/@common/apiTest';

const FullWidth = 250;

const getWidth = (time: number, total: number) => {
  return FullWidth * (time / total);
};

const TimeCost = () => {
  const res = useAtomValue(ResultAtom);

  if (!res || res.isError) {
    return null;
  }

  const { timer } = (res as ApiTestRes).result as ExactRes;
  const total = parseInt(timer[timer.length - 1].time.toString());
  return (
    <div className={styles.timeCost}>
      <div className={styles.timeLine}>
        <div className={styles.timeTitle} style={{ borderColor: 'transparent', color: '#3DDF6E' }}>
          Event:
        </div>
        <div className={styles.timeRect} style={{ borderColor: 'transparent' }}>
          <div className={styles.rect} style={{ width: 0 }} />
        </div>
        <div className={styles.timeNumber} style={{ color: '#3DDF6E' }}>
          Time
        </div>
      </div>
      {timer.map((item, index) => {
        if (item.key !== 'total') {
          return (
            <div className={styles.timeLine} key={item.key}>
              <div className={styles.timeTitle}>{item.key}</div>
              <div className={styles.timeRect}>
                <div
                  className={styles.rect}
                  style={{
                    width: getWidth(parseInt(item.time.toString()), total)
                  }}
                />
              </div>
              <div className={styles.timeNumber}>{item.time}ms</div>
            </div>
          );
        }
      })}
      <div className={styles.timeLine}>
        <div className={styles.timeTitle} style={{ borderColor: 'transparent', color: '#FF8000' }}>
          Total:
        </div>
        <div className={styles.timeRect} style={{ borderColor: 'transparent' }}>
          <div className={styles.rect} style={{ width: 0 }} />
        </div>
        <div className={styles.timeNumber} style={{ color: '#EB5298' }}>
          {total}ms
        </div>
      </div>
    </div>
  );
};

export default TimeCost;
