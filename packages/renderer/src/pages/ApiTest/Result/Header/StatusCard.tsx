import React from 'react';
import styles from './statusCard.module.scss';
import TimeIcon from '/@cmp/svg/TimeIcon';
import Popup from '/@cmp/Popup';
import TimeCost from '/@/pages/ApiTest/Result/Header/TimeCost';
import { useAtomValue } from 'jotai';
import { ResultAtom } from '/@/store/ApiTest/result.store';
import { ApiTestRes, ExactRes, ReqError } from '/@common/apiTest';

export const StatusCard = () => {
  const res = useAtomValue(ResultAtom);
  if (!res) {
    return null;
  }
  let statusCode;
  let statusMassage;
  let size;
  if (res.isError) {
    if ((res.error as ReqError).type !== 'http') {
      statusCode = (res.error as ReqError).errorCode;
      statusMassage = 'Error';
      size = {
        resBodySize: '0 B',
        resHeaderSize: '0 B'
      } as ExactRes['size'];
    } else {
      statusCode = (res.error as ReqError).errorCode;
      statusMassage = (res.error as ReqError).desc;
      size = (res.error as ReqError).httpErrorObj!.size as ExactRes['size'];
    }
  } else {
    statusCode = (res.result as ExactRes).statusCode;
    statusMassage = (res.result as ExactRes).statusMassage;
    size = (res.result as ExactRes).size;
  }
  return (
    <div className={styles.statusCard} style={{ borderColor: getColor(statusCode) }}>
      <div className={styles.statusCode} style={{ color: getColor(statusCode) }}>
        {statusCode}
      </div>
      <div className={styles.statusDesc} style={{ color: getColor(statusCode) }}>
        {statusMassage}
      </div>
      <div className={styles.statusTiming}>
        <Popup trigger={<TimeIcon fill={getColor(statusCode)} transform={'scale(1.2)'} />}>
          <TimeCost />
        </Popup>
      </div>
      <div className={styles.statusSize}>
        <Popup trigger={<div style={{ color: getColor(statusCode) }}>{size.resBodySize}</div>}>
          <div className={styles.sizeCon}>
            <div className={styles.sizeItem}>
              <div>响应头</div>
              <div>{size.resHeaderSize}</div>
            </div>
            <div className={styles.sizeItem}>
              <div>响应体</div>
              <div>{size.resBodySize}</div>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
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
