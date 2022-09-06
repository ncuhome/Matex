import React, { useEffect, useRef, useState } from 'react';
import Mask from '/@cmp/Mask';
import idleIcon from '/@/assets/images/idle.svg';
import CircleDotLoading from '/@cmp/Loading/CircleDotLoading';
import { emittery } from '/@/utils/instance';
import ResultHeader from '/@/pages/ApiTest/Result/Header/Header';
import styles from './index.module.scss';
import PrettyView from "/@/pages/ApiTest/Result/Body/Pretty";

export type StatusType = 'Idle' | 'Processing' | 'Result';

const Idle = () => {
  return (
      <div className={styles.idleCon}>
        <img src={idleIcon} style={{ width: 300, height: 250 }} alt={'Idle'} />
      </div>
  )
}

const ReqResult = () => {
  const [status, SetStatus] = useState<StatusType>('Idle');

  useEffect(() => {
    emittery.on('Result-Status', (data: StatusType) => {
      SetStatus(data);
    });
  }, []);

  const _render = () => {
    return (
      <Mask overlayPanel={<CircleDotLoading />} isMask={status === 'Processing'}>
        {status === 'Idle' && <Idle/>}
        {status === 'Result' && <PrettyView />}
      </Mask>
    );
  };

  return (
    <div className={styles.result}>
      <div className={styles.header}>
        <ResultHeader />
      </div>
      <div className={styles.body}>{_render()}</div>
    </div>
  );
};

export default ReqResult;
