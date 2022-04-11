import React, { useState } from 'react';
import styles from './index.module.scss';
import { Label } from 'semantic-ui-react';
import { useAtom } from 'jotai';
import { socketIoSendChannelAtom, websocketTypeAtom } from '/@/store/websocketStore';
import StartBtn from '/@/pages/WebSocket/MsgWin/Footer/StartBtn';
import { useAtomValue } from 'jotai/utils';
import clsx from 'clsx';

const labelStyle = {
  width: 70,
  textAlign: 'center',
  position: 'absolute',
  marginTop: 5,
  left: 10
};

const MsgWinFooter = () => {
  const [channel, setChannel] = useAtom(socketIoSendChannelAtom);
  const [inputContent, setContent] = useState('');
  const wsType = useAtomValue(websocketTypeAtom);

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
        <div className={styles.top}>
          <Label size={'small'} as="a" color={'violet'} style={labelStyle}>
            发送消息
          </Label>
          <input
            value={channel}
            className={clsx([styles.channelName, wsType === 'native ws' && styles.hidden])}
            onChange={(e) => setChannel(e.target.value)}
            placeholder={'通道名'}
          />
        </div>
        <div className={styles.body}>
          <textarea
            placeholder={'请输入要发送的消息'}
            value={inputContent}
            className={styles.msgInput}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.ops}>
        <div className={styles.clear} onClick={() => setContent('')}>
          清除
        </div>
        <div className={styles.send} onClick={sendMsg}>
          发送
        </div>
      </div>
      <div className={styles.startBtn}>
        <StartBtn />
      </div>
    </div>
  );
};

export default MsgWinFooter;
