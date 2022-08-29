import React from 'react';
import styles from './index.module.scss';
import { ResDataTypeAtom, ResDisplayTypeAtom } from '/@/store/ApiTest/config.store';
import { useAtom } from 'jotai';
import ResultHeader from '/@/pages/ApiTest/Result/Header/Header';
import Mask from '/@cmp/Mask';
import idleIcon from '/@/assets/images/idle.svg';
import ResultBody from "/@/pages/ApiTest/Result/Body";


const Idle = () => {
  return (
    <Mask>
      <img src={idleIcon} style={{ width: 300, height: 250 }} />
    </Mask>
  );
};

const ReqResult = () => {
  const [resDataType, setResDataType] = useAtom(ResDataTypeAtom);
  const [ResDisplayType, setResDisplayType] = useAtom(ResDisplayTypeAtom);

  return (
    <div className={styles.result}>
      {/*<Idle/>*/}
      {/*<Mask>*/}
      {/*  <Loading bgColor={'transparent'}/>*/}
      {/*</Mask>*/}
      <div className={styles.header}>
        <ResultHeader />
      </div>
      <div className={styles.body}>
        <ResultBody/>
      </div>
    </div>
  );
};

export default ReqResult;
