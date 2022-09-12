import React from 'react';
import ServerErrImg from '/@/assets/images/5xx.svg';
import NotFoundErrImg from '/@/assets/images/4xx.svg';
import reqErrorImg from '/@/assets/images/reqError.svg';
import styles from './index.module.scss';
import { useAtomValue } from 'jotai/utils';
import { ResultAtom } from '/@/store/ApiTest/result.store';
import { ApiTestRes, ReqError } from '/@common/apiTest';

const getImg = (statusCode: string | number) => {
  if (statusCode.toString().includes('4')) {
    return NotFoundErrImg;
  } else if (statusCode.toString().includes('5')) {
    return ServerErrImg;
  } else {
    return reqErrorImg;
  }
};

const ReqErrorComp = () => {
  const { error } = useAtomValue(ResultAtom) as ApiTestRes;
  const isHttpErr = (error as ReqError).type === 'http';
  const errorMessage = error!.desc;

  return (
    <div className={styles.reqError}>
      <img
        src={!isHttpErr ? reqErrorImg : getImg(error!.errorCode ?? 0)}
        className={styles.img}
        alt={'error'}
      />
      <div className={styles.msg}>{errorMessage}</div>
    </div>
  );
};

export default ReqErrorComp;
