import React from 'react';
import styles from './index.module.scss';
import { Button, Icon } from 'semantic-ui-react';
import { getStatusColor } from '/@/pages/WebSocket/utils';
import { useNativeWs, useNativeWsStatus } from '/@/request/nativeWs';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useMsgList, websocketChannelAtom, websocketTypeAtom } from '/@/store/websocketStore';
import { useSocketIo } from '/@/request/socketIo';

const Title = () => {
  const status = useNativeWsStatus();
  const { closeWs } = useNativeWs();
  const { closeSocketIo } = useSocketIo();
  const { clearList } = useMsgList();
  const wsType = useAtomValue(websocketTypeAtom);
  const setSocketIoEv = useUpdateAtom(websocketChannelAtom);

  const close = wsType === 'native' ? closeWs : closeSocketIo;
  const { color, text } = getStatusColor(status);

  return (
    <div className={styles.titleCon}>
      <div className={styles.options}>
        <Button.Group>
          <Button className={styles.opBtn} animated={'vertical'} size={'small'} onClick={() => close()}>
            <Button.Content hidden>断开</Button.Content>
            <Button.Content visible>
              <Icon name="power off" />
            </Button.Content>
          </Button>
          <Button className={styles.opBtn} animated={'vertical'} size={'small'} onClick={() => clearList()}>
            <Button.Content hidden>清空</Button.Content>
            <Button.Content visible>
              <Icon name="trash" />
            </Button.Content>
          </Button>
        </Button.Group>
        {wsType === 'socket.io' && (
          <div className={styles.channel}>
            <span className={styles.label}>频道</span>
            <input
              onChange={(e) => setSocketIoEv(e.target.value)}
              className={styles.channelInput}
              placeholder={'输入eventName'}
            />
          </div>
        )}
      </div>
      <div className={styles.statusCon} style={{ color }}>
        {text}
      </div>
    </div>
  );
};

export default Title;
