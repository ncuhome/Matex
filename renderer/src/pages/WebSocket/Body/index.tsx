import styles from './index.module.scss';
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useMsgList, websocketSocketIoAtom } from '/@/store/websocketStore';
import MsgList from '/@cmp/MsgList';
import { Button } from 'semantic-ui-react';

const Body = () => {
  const [isSocketIo, setSocket] = useAtom(websocketSocketIoAtom);
  const { msgList, addMsg } = useMsgList();

  const handleClick = (socket: boolean) => {
    if (socket) {
      !isSocketIo && setSocket(true);
    } else {
      isSocketIo && setSocket(false);
    }
  };

  const addItem = (e) => {
    addMsg({
      type: Math.random() > 0.5 ? 'client' : 'server',
      message: '你好啊',
      time: '2020-01-04'
    });
  };

  useEffect(() => {
    const msgEndEle = document.getElementById('msgCon') as HTMLDivElement;
    msgEndEle.scrollTo(0, msgEndEle.scrollHeight);
  }, [msgList]);

  return (
    <div className={styles.body}>
      <div className={styles.msgWin}>
        <div className={styles.titleCon}>
          <div className={styles.options}>
            <div
              className={clsx([styles.btn, !isSocketIo && styles.activeBtn])}
              onClick={() => handleClick(false)}
            >
              native
            </div>
            <div
              className={clsx([styles.btn, isSocketIo && styles.activeBtn])}
              onClick={() => handleClick(true)}
            >
              socket.io
            </div>
          </div>
        </div>
        <div className={styles.chatWin}>
          <MsgList list={msgList} />
        </div>
      </div>
      <div className={styles.inputCon}>
        <Button onClick={addItem}>add</Button>
      </div>
    </div>
  );
};

export default Body;
