import styles from './index.module.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { useMsgList, websocketNativeConnAtom } from '/@/store/websocketStore';
import MsgList from '/@cmp/MsgList';
import { Button, Icon } from 'semantic-ui-react';
import Title from '/@/pages/WebSocket/Body/Title';
import { matexTime } from '/@/utils/time';
import { useAtomValue } from 'jotai/utils';

const Body = () => {
  const { msgList, addMsg } = useMsgList();
  const [inputContent, setContent] = useState('');
  const ws = useAtomValue(websocketNativeConnAtom);

  useEffect(() => {
    const msgEndEle = document.getElementById('msgCon') as HTMLDivElement;
    msgEndEle.scrollTo(0, msgEndEle.scrollHeight);
  }, [msgList]);

  const sendMsg = () => {
    addMsg({
      type: 'client',
      message: inputContent,
      time: matexTime().format('YYYY-MM-DD HH:mm:ss')
    });
    setContent('');
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className={styles.body}>
      {useMemo(
        () => (
          <div className={styles.msgWin}>
            <Title />
            <div className={styles.chatWin}>
              <MsgList list={msgList} />
            </div>
          </div>
        ),
        [msgList, ws]
      )}
      <div className={styles.inputCon}>
        <div className={styles.textArea}>
          <input
            className={styles.input}
            value={inputContent}
            onChange={handleChange}
            placeholder="请输入消息"
          />
        </div>
        <div className={styles.ops}>
          <Button animated color={'teal'} onClick={sendMsg}>
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
