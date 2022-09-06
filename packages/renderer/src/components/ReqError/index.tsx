import React from 'react';
import errorImg from '/@/assets/icon/req_error.svg';
import styles from './index.module.scss';
import { useAtomValue } from 'jotai/utils';
import {ResultErrorAtom} from "/@/store/ApiTest/result.store";

const ReqError = () => {
  const errorObj = useAtomValue(ResultErrorAtom);
  const index = errorObj?.stack.indexOf('\n');
  const errorMessage = errorObj?.stack.slice(0, index);
  // const errorMessage = `${errorObj?.syscall} ${errorObj?.code} ${errorObj?.address}:${errorObj?.port}`;
  return (
    <div className={styles.reqError}>
      <img src={errorImg} className={styles.img} alt={'error'} />
      <div className={styles.msg}>{errorMessage}</div>
    </div>
  );
};

export default ReqError;
