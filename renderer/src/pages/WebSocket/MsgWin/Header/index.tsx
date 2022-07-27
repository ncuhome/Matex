import React from 'react';
import styles from './index.module.scss';
import { Label } from 'semantic-ui-react';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { websocketTypeAtom, websocketUrlAtom } from '/@/store/websocketStore';
import { useWsStatus } from '/@/pages/WebSocket/MsgWin/Header/useWsStatus';
import { WsStatus } from '/@/type/websocketPage';

const MsgWinHeader = () => {
  const wsType = useAtomValue(websocketTypeAtom);
  const updateUrl = useUpdateAtom(websocketUrlAtom);
  const getStatus = useWsStatus();

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
        <div className={styles.dot} style={{ background: getDotColor(getStatus(wsType)) }} />
        <div className={styles.statusTitle}>状态:</div>
        <div className={styles.statusText}>{getStatus(wsType)}</div>
      </div>
    </div>
  );
};

const getDotColor = (status: WsStatus) => {
  switch (status) {
    case '未连接':
      return '#F96D6D';
    case '连接中':
      return '#FBBF0E';
    case '已连接':
      return '#43D1C9';
    case '关闭中':
      return '#6487BB';
  }
};

export default MsgWinHeader;
