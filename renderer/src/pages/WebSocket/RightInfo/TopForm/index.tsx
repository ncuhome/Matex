import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { Button, Dropdown, Icon, Label, Popup } from 'semantic-ui-react';
import dropdownStyle from '/@/style/apitest/index.module.scss';
import { wsClientOptions } from '/@/model/ws.model';
import { useAtom } from 'jotai';
import { useSocketIoChannels, websocketTypeAtom } from '/@/store/websocketStore';
import type { WebsocketType } from '/@/type/websocketPage';
import { useNativeWs } from '/@/request/nativeWs';
import { useSocketIo } from '/@/request/socketIo';
import { ChannelStatus } from '/@/type/websocketPage';

const clientOptions = wsClientOptions.map((item) => ({
  key: item,
  text: item,
  value: item
}));

const TopForm = () => {
  const [wsType, setWsType] = useAtom(websocketTypeAtom);
  const { closeWs } = useNativeWs();
  const { closeSocketIo } = useSocketIo();
  const {
    channels: socketIoChan,
    addChannel,
    listenChannel,
    changeChannel,
    deleteChannel
  } = useSocketIoChannels();
  const isSocketIo = wsType === 'socket io';

  const channels: ChannelStatus[] = isSocketIo ? socketIoChan : [{ val: 'message', listen: true }];
  useEffect(() => {
    if (!isSocketIo) {
      closeSocketIo();
    } else {
      closeWs();
    }
  }, [wsType]);

  const addListen = (index: number) => {
    listenChannel(index);
  };

  return (
    <div className={styles.topForm}>
      <div className={styles.sideSelect}>
        <div className={clsx([styles.sideBtn, styles.activeSideBtn])}>客户端</div>
        <div className={clsx([styles.sideBtn])}>服务端</div>
      </div>
      <div className={styles.sideIconCon}>
        <Icon name="desktop" className={styles.sideIcon} />
      </div>
      <div className={styles.connSelect}>
        <Label size={'small'} color={'teal'}>
          连接方式
        </Label>
        <Button.Group style={{ marginLeft: 10 }} className={dropdownStyle.dropDown} color="blue">
          <Button className={dropdownStyle.btn}>{wsType}</Button>
          <Dropdown
            className={clsx(['button', 'icon', dropdownStyle.select])}
            floating
            onChange={(e, { value }) => setWsType(value as WebsocketType)}
            options={clientOptions}
            trigger={<></>}
          />
        </Button.Group>
      </div>
      <div className={styles.channel}>
        <Label size={'small'} color={'orange'}>
          监听频道
        </Label>
        <div className={styles.channelNum}>
          <span className={styles.number}>{channels.length} 个</span>
          <Popup
            on="click"
            position={'bottom right'}
            pinned
            trigger={
              <Icon name="edit" color={'teal'} circular style={{ marginLeft: 10, cursor: 'pointer' }} />
            }
          >
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
          </Popup>
        </div>
      </div>
      <div className={styles.more}>
        <Icon name={'arrow right'} />
        更多配置
      </div>
    </div>
  );
};

export default TopForm;
