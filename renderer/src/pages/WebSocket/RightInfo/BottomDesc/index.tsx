import React from 'react';
import styles from './index.module.scss';
import SocketIoInfoCard from './SocketIoInfoCard';
import { useAtomValue } from 'jotai/utils';
import { websocketTypeAtom } from '/@/store/websocketStore';
import NativeInfoCard from '/@/pages/WebSocket/RightInfo/BottomDesc/NativeInfoCard';

const BottomDesc = () => {
  const wsType = useAtomValue(websocketTypeAtom);

  return (
    <div className={styles.infoCon}>{wsType === 'socket io' ? <SocketIoInfoCard /> : <NativeInfoCard />}</div>
  );
};

export default BottomDesc;
