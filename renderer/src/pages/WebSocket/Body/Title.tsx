import React from 'react';
import styles from './index.module.scss';
import { Button, Icon } from 'semantic-ui-react';
import { getConnStatus } from '/@/pages/WebSocket/Body/utils';
import { useNativeWsStatus } from '/@/request/nativeWs';

const Title = () => {
  const status = useNativeWsStatus();

  const { color, text } = getConnStatus(status);

  return (
    <div className={styles.titleCon}>
      <div className={styles.options}>
        <Button.Group>
          <Button animated={'vertical'} size={'small'}>
            <Button.Content hidden>断开</Button.Content>
            <Button.Content visible>
              <Icon name="power off" />
            </Button.Content>
          </Button>
          <Button animated={'vertical'} size={'small'}>
            <Button.Content hidden>重连</Button.Content>
            <Button.Content visible>
              <Icon name="linkify" />
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
