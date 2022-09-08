import React from 'react';
import ServerErrImg from '/@/assets/images/5xx.svg';
import NotFoundErrImg from '/@/assets/images/4xx.svg';
import reqErrorImg from '/@/assets/images/reqError.svg';
import styles from './index.module.scss';
import { useAtomValue } from 'jotai/utils';
import { ResultErrorAtom } from '/@/store/ApiTest/result.store';

interface ReqErrorProps {
  type: 'resError' | 'reqError';
  statusCode?: number | string;
  msg?: string;
}

const getImg = (statusCode: string | number) => {
  if (statusCode.toString().includes('4')) {
    return NotFoundErrImg;
  } else if (statusCode.toString().includes('5')) {
    return ServerErrImg;
  } else {
    return reqErrorImg;
  }
};

const ReqError: React.FC<ReqErrorProps> = ({ type, msg, statusCode }) => {
  let errorMessage = '';
  if (type === 'reqError') {
    const errorObj = useAtomValue(ResultErrorAtom);
    const index = errorObj?.stack.indexOf('\n');
    errorMessage = errorObj?.stack.slice(0, index) ?? '';
  } else {
    errorMessage = msg ?? '';
  }

  return (
    <div className={styles.reqError}>
      <img
        src={type === 'reqError' ? reqErrorImg : getImg(statusCode ?? 0)}
        className={styles.img}
        alt={'error'}
      />
      <div className={styles.msg}>{errorMessage}</div>
    </div>
  );
};

export default ReqError;
