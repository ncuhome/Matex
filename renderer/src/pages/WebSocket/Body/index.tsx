import styles from './index.module.scss';
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { useMsgList, websocketSocketIoAtom } from '/@/store/websocketStore';
import MsgList from '/@cmp/MsgList';
import { Button, Form, Icon, Input, TextArea } from 'semantic-ui-react';

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
        <div className={styles.textArea}>
          <Input
            fluid
            size={'large'}
            icon={{ name: 'file outline', circular: true, link: true }}
            placeholder="Search..."
          />
        </div>
        <div className={styles.ops}>
          <Button animated color={'green'}>
            <Button.Content hidden>发送</Button.Content>
            <Button.Content visible>
              <Icon name="send" />
            </Button.Content>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Body;
