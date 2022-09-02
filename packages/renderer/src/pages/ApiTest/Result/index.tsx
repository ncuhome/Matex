import React, { useEffect, useState } from 'react';
import Mask from '/@cmp/Mask';
import idleIcon from '/@/assets/images/idle.svg';
import CircleDotLoading from '/@cmp/Loading/CircleDotLoading';
import { emittery } from '/@/utils/instance';
import ResultBodyEditor from '/@/pages/ApiTest/Result/Body/Editor';
import ResultHeader from '/@/pages/ApiTest/Result/Header/Header';
import styles from './index.module.scss';

export type StatusType = 'Idle' | 'Processing' | 'Result';

const Idle = () => {
  return (
    <Mask>
      <img src={idleIcon} style={{ width: 300, height: 250 }} alt={'Idle'} />
    </Mask>
  );
};

const ReqResult = () => {
  const [status, SetStatus] = useState<StatusType>('Processing');

  useEffect(() => {
    emittery.on('Result-Status', (data: StatusType) => {
      SetStatus(data);
    });
  }, []);

  const _render = () => {
    if (status === 'Idle') {
      return <Idle />;
    } else if (status === 'Processing') {
      return (
        <>
          <Mask>
            <CircleDotLoading />
          </Mask>
          <ResultBodyEditor />
        </>
      );
    } else if (status === 'Result') {
      return <ResultBodyEditor />;
    } else {
      return null;
    }
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
