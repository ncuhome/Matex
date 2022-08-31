import React from 'react';
import styles from './index.module.scss';

const times = [
  { key: 'init-socket', time: 23.67 },
  { key: 'dns-lookup', time: 68.98 },
  { key: 'tcp-conn', time: 123.69 },
  { key: 'first-byte', time: 45.12 },
  { key: 'download', time: 134.55 }
];

const FullWidth = 270;
let TotalTime = 0;
times.map((item) => {
  TotalTime += item.time;
});

const getWidth = (time: number) => {
  return FullWidth * (time / TotalTime);
};

const getMargin = (index: number) => {
  let width = 0;
  times.map((item, _index) => {
    if (_index < index) {
      width += getWidth(item.time);
    }
  });
  return width;
};

const TimeCost = () => {
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
      {times.map((item, index) => {
        return (
          <div className={styles.timeLine} key={item.key}>
            <div className={styles.timeTitle}>{item.key}</div>
            <div className={styles.timeRect}>
              <div
                className={styles.rect}
                style={{
                  width: getWidth(item.time)
                }}
              />
            </div>
            <div className={styles.timeNumber}>{item.time}ms</div>
          </div>
        );
      })}
      <div className={styles.timeLine}>
        <div className={styles.timeTitle} style={{ borderColor: 'transparent', color: '#FF8000' }}>
          Total:
        </div>
        <div className={styles.timeRect} style={{ borderColor: 'transparent' }}>
          <div className={styles.rect} style={{ width: 0 }} />
        </div>
        <div className={styles.timeNumber} style={{ color: '#EB5298' }}>
          {TotalTime}ms
        </div>
      </div>
    </div>
  );
};

export default TimeCost;
