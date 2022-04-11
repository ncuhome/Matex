import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useAtom } from 'jotai';
import { StartBtnAtom, websocketTypeAtom } from '/@/store/websocketStore';
import { useAtomValue } from 'jotai/utils';
import { useWsStatus } from '/@/pages/WebSocket/MsgWin/Header/useWsStatus';
import { useSocketIo } from '/@/request/socketIo';
import { useNativeWs } from '/@/request/nativeWs';

export interface StartBtnProps {
  text: string;
  status: 'error' | 'success' | 'normal';
}

const StartBtn = () => {
  const [btnStatus, setStatus] = useAtom(StartBtnAtom);
  const wsType = useAtomValue(websocketTypeAtom);
  const { connSocketIo, closeSocketIo } = useSocketIo();
  const { connectWs, closeWs } = useNativeWs();
  const getStatus = useWsStatus();
  const wsStatus = getStatus(wsType);

  const handleMouseEnter = () => {
    if (wsStatus === '已连接') {
      setStatus({ text: '关闭', status: 'error' });
    }
  };
  const handleMouseLeave = () => {
    if (wsStatus === '已连接') {
      setStatus({ text: '在线', status: 'success' });
    }
  };

  const handleClick = async () => {
    if (wsType === 'socket io') {
      if (wsStatus === '已连接') {
        closeSocketIo();
        setStatus({ text: '启动', status: 'normal' });
      } else {
        const res = await connSocketIo();
        res && setStatus({ text: '在线', status: 'success' });
      }
    } else {
      if (wsStatus === '已连接') {
        closeWs();
        setStatus({ text: '启动', status: 'normal' });
      } else {
        const res = await connectWs();
        res && setStatus({ text: '在线', status: 'success' });
      }
    }
  };

  return (
    <div
      className={styles.startBtn}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles[btnStatus.status]}>
        <div className={styles.text}>{btnStatus.text}</div>
      </div>
    </div>
  );
};

export default StartBtn;
