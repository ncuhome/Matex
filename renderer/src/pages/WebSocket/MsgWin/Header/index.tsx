import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { Label } from 'semantic-ui-react';
import { useSocketIo } from '/@/request/socketIo';
import { Emitter } from '/@/utils/EventEmiter';
import { StartBtnProps } from '/@/store/commonStore/type';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { websocketTypeAtom, websocketUrlAtom } from '/@/store/websocketStore';
import Emittery from 'emittery';
import { useWsStatus } from '/@/pages/WebSocket/MsgWin/Header/useWsStatus';

const MsgWinHeader = () => {
  const { connSocketIo } = useSocketIo();
  const wsType = useAtomValue(websocketTypeAtom);
  const updateUrl = useUpdateAtom(websocketUrlAtom);
  const listenerRef = useRef<Emittery.UnsubscribeFn>();
  const getStatus = useWsStatus();

  useEffect(() => {
    listenerRef.current = Emitter.on<StartBtnProps['className']>('startBtn.click', (status) => {
      wsType === 'socket io' ? connSocketIo() : connSocketIo();
    });

    return () => {
      listenerRef.current?.();
    };
  }, []);

  return (
    <div className={styles.header}>
      <Label
        size={'small'}
        as="a"
        color={'teal'}
        style={{ width: 60, textAlign: 'center', margin: '0 10px' }}
      >
        路径
      </Label>
      <input className={styles.input} placeholder={'请输入url'} onChange={(e) => updateUrl(e.target.value)} />
      <div className={styles.status}>
        <div className={styles.statusTitle}>状态:</div>
        <div className={styles.statusText}>{getStatus(wsType)}</div>
      </div>
    </div>
  );
};

export default MsgWinHeader;
