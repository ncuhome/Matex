import React, { useState } from 'react';
import styles from './index.module.scss';
import { Label } from 'semantic-ui-react';
import { useAtom } from 'jotai';
import { socketIoSendChannelAtom, useMsgList } from '/@/store/websocketStore';
import { matexTime } from '/@/utils/time';
import toast from 'react-hot-toast';
import { Socket } from 'socket.io-client';

const labelStyle = {
  width: 70,
  textAlign: 'center',
  position: 'absolute',
  left: 10
};

const MsgWinFooter = () => {
  const [channel, setChannel] = useAtom(socketIoSendChannelAtom);
  const { msgList, addMsg } = useMsgList();
  const [inputContent, setContent] = useState('');

  const sendMsg = () => {
    // if (wsType === 'native') {
    //   if (ws && (ws as WebSocket).readyState === 1) {
    //     addMsg({
    //       type: 'client',
    //       message: inputContent,
    //       time: matexTime().format('YYYY-MM-DD HH:mm:ss')
    //     });
    //     ws?.send(inputContent);
    //     setContent('');
    //   } else {
    //     toast.error('请先连接websocket服务器');
    //   }
    // } else {
    //   if (ws && (ws as unknown as Socket).connected) {
    //     if (socketIoEv.trim() === '') {
    //       (ws as unknown as Socket).send(inputContent);
    //     } else {
    //       (ws as unknown as Socket).emit(socketIoEv, inputContent);
    //     }
    //     addMsg({
    //       type: 'client',
    //       message: inputContent,
    //       time: matexTime().format('YYYY-MM-DD HH:mm:ss')
    //     });
    //     setContent('');
    //   } else {
    //     toast.error('请先连接websocket服务器');
    //   }
    // }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className={styles.footer}>
      <div className={styles.msgCon}>
        <Label size={'small'} as="a" color={'violet'} style={labelStyle}>
          消息输入
        </Label>
        <textarea value={inputContent} className={styles.msgInput} onChange={handleChange} />
      </div>
      <div className={styles.ops}>
        <input
          value={channel}
          className={styles.channelName}
          onChange={(e) => setChannel(e.target.value)}
          placeholder={'通道名'}
        />
        <div className={styles.clear} onClick={() => setContent('')}>
          清除
        </div>
        <div className={styles.send} onClick={sendMsg}>
          发送
        </div>
      </div>
    </div>
  );
};

export default MsgWinFooter;
