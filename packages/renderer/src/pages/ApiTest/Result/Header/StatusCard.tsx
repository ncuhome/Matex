import React from 'react';
import styles from './statusCard.module.scss';
import TimeIcon from '/@cmp/svg/TimeIcon';
import Popup from '/@cmp/Popup';
import TimeCost from '/@/pages/ApiTest/Result/Header/TimeCost';
import { useAtomValue } from 'jotai';
import { ResultAtom } from '/@/store/ApiTest/result.store';

export const StatusCard = () => {
  const res = useAtomValue(ResultAtom);
  if (!res) {
    return null;
  } else {
    return (
      <div className={styles.statusCard} style={{borderColor:getColor(res.statusCode)}}>
        <div className={styles.statusCode} style={{color:getColor(res.statusCode)}}>{res.statusCode}</div>
        <div className={styles.statusDesc} style={{color:getColor(res.statusCode)}}>{res.statusMassage}</div>
        <div className={styles.statusTiming}>
          <Popup trigger={<TimeIcon fill={getColor(res.statusCode)} transform={'scale(1.2)'} />}>
            <TimeCost />
          </Popup>
        </div>
        <div className={styles.statusSize}>
          <Popup trigger={<div style={{color:getColor(res.statusCode)}}>{res.size.resBodySize}</div>}>
            <div className={styles.sizeCon}>
              <div className={styles.sizeItem}>
                <div>响应头</div>
                <div>{res.size.resHeaderSize}</div>
              </div>
              <div className={styles.sizeItem}>
                <div>响应体</div>
                <div>{res.size.resBodySize}</div>
              </div>
            </div>
          </Popup>
        </div>
      </div>
    );
  }
};

const getColor = (statusCode: number) => {
  if (statusCode < 200) {
    return 'var(--normal-color)';
  } else if (statusCode >= 200 && statusCode < 300) {
    return 'var(--success-color)';
  } else if (statusCode >= 300 && statusCode < 400) {
    return 'var(--light-text1)';
  } else if (statusCode >= 400 && statusCode < 500) {
    return 'var(--warning-color)';
  } else {
    return 'var(--error-color)';
  }
};
