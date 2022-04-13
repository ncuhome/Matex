import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { Button, Dropdown, Icon, Label, Popup } from 'semantic-ui-react';
import dropdownStyle from '/@/style/apitest/index.module.scss';
import { wsClientOptions } from '/@/model/ws.model';
import { useAtom } from 'jotai';
import { externalWsAtom, useSocketIoChannels, websocketTypeAtom } from '/@/store/websocketStore';
import type { WebsocketType } from '/@/type/websocketPage';
import { useNativeWs } from '/@/request/nativeWs';
import { useSocketIo } from '/@/request/socketIo';
import { ChannelStatus } from '/@/type/websocketPage';
import ChannelList from '/@/pages/WebSocket/RightInfo/TopForm/ChannelList';

const clientOptions = wsClientOptions.map((item) => ({
  key: item,
  text: item,
  value: item
}));

const TopForm = () => {
  const [down,setDown] = React.useState(false);
  const [wsType, setWsType] = useAtom(websocketTypeAtom);
  const { closeWs } = useNativeWs();
  const [externalWs,setExternalWs] = useAtom(externalWsAtom);
  const { closeSocketIo } = useSocketIo();
  const {
    channels: socketIoChan
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

  return (
    <div className={styles.topForm}>
      <div className={clsx([styles.front,down&&styles.slideDown])}>
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
              <ChannelList/>
            </Popup>
          </div>
        </div>
        <div className={styles.moreBtn} onClick={()=>setDown(true)}>
          <Icon name={'arrow right'} />&nbsp;
          更多配置
        </div>
      </div>
      <div className={clsx([styles.more,down&&styles.slideDown])}>
        <div className={styles.backBtn} onClick={()=>setDown(false)}>
          <Icon name={'arrow left'} />&nbsp;
          更多配置
        </div>
        <div className={styles.configLine}>
          <div className={styles.key}>
            binaryType
          </div>
          <div>
            <input className={styles.value}
              value={externalWs.binaryType}
              onChange={(e)=>setExternalWs({...externalWs,binaryType:e.target.value as any})}
            />
          </div>
        </div>
        <div className={styles.configLine}>
          <div className={styles.key}>
            protocols
          </div>
          <div>
            <input className={styles.value}
              value={externalWs.protocols}
                   placeholder={'默认为空'}
              onChange={(e)=>setExternalWs({...externalWs,protocols:e.target.value})}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopForm;
