import React from 'react';
import styles from './index.module.scss';
import { Button, Icon } from 'semantic-ui-react';
import { getStatusColor } from '/@/pages/WebSocket/utils';
import { useNativeWs, useNativeWsStatus } from '/@/request/nativeWs';
import { useAtomValue } from 'jotai/utils';
import { useMsgList, websocketUrlAtom } from '/@/store/websocketStore';

const Title = () => {
  const status = useNativeWsStatus();
  const { closeWs, reConnectWs } = useNativeWs();
  const url = useAtomValue(websocketUrlAtom);
  const { clearList } = useMsgList();

  const { color, text } = getStatusColor(status);

  return (
    <div className={styles.titleCon}>
      <div className={styles.options}>
        <Button.Group>
          <Button animated={'vertical'} size={'small'} onClick={() => closeWs()}>
            <Button.Content hidden>断开</Button.Content>
            <Button.Content visible>
              <Icon name="power off" />
            </Button.Content>
          </Button>
          <Button
            animated={'vertical'}
            size={'small'}
            onClick={() =>
              reConnectWs({
                url
              })
            }
          >
            <Button.Content hidden>重连</Button.Content>
            <Button.Content visible>
              <Icon name="linkify" />
            </Button.Content>
          </Button>
          <Button animated={'vertical'} size={'small'} onClick={() => clearList()}>
            <Button.Content hidden>清空</Button.Content>
            <Button.Content visible>
              <Icon name="trash" />
            </Button.Content>
          </Button>
        </Button.Group>
      </div>
      <div className={styles.statusCon} style={{ color, borderColor: color }}>
        {text}
      </div>
    </div>
  );
};

export default Title;
