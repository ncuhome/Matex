import React from 'react';
import styles from './index.module.scss';
import { Icon } from 'semantic-ui-react';
import { useSocketIoChannels, websocketTypeAtom } from '/@/store/websocketStore';
import { ChannelStatus } from '/@/type/websocketPage';
import { useAtomValue } from 'jotai/utils';

const ChannelList = () => {
  const wsType= useAtomValue(websocketTypeAtom);
  const {
    channels: socketIoChan,
    addChannel,
    listenChannel,
    changeChannel,
    deleteChannel
  } = useSocketIoChannels();
  const isSocketIo = wsType === 'socket io';

  const channels: ChannelStatus[] = isSocketIo ? socketIoChan : [{ val: 'message', listen: true }];

  const addListen = (index: number) => {
    listenChannel(index);
  };

  return (
    <div className={styles.channelList}>
      {channels.map((item, index) => (
        <div key={index} className={styles.channelItem}>
          <div className={styles.channelIndex}>{index + 1}.</div>
          <input
            className={styles.channelContent}
            value={item.val}
            onChange={(e) => {
              changeChannel(index, e.target.value);
            }}
          />
          {item.val !== 'message' && (
            <div
              className={styles.closeBtn}
              onClick={() => (item.listen ? deleteChannel(index) : addListen(index))}
            >
              {item.listen ? (
                <Icon name={'close'} className={styles.closeIcon} />
              ) : (
                <Icon name={'add'} className={styles.closeIcon} color={'orange'} />
              )}
            </div>
          )}
        </div>
      ))}
      {isSocketIo && (
        <div className={styles.addChannel} onClick={() => addChannel('')}>
          添加频道
        </div>
      )}
    </div>
  );
};

export default ChannelList;
