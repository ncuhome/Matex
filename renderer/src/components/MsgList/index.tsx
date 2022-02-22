import React, { Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './index.module.scss';
import { WsMessage } from '/@/type/websocketPage';

interface MsgListProps {
  list: WsMessage[];
}

const MsgList: React.FC<MsgListProps> = ({ list }) => {
  const renderLeft = (msgObj: WsMessage) => {
    return (
      <div className={styles.conLeft}>
        <div className={styles.iconLeft}>
          <Icon color={'brown'} circular name={'server'} size={'large'} />
        </div>
        <div className={styles.descLeft}>
          <div className={styles.descTextLeft}>{msgObj.message}</div>
          <div className={styles.descTime}>{msgObj.time}</div>
        </div>
      </div>
    );
  };

  const renderRight = (msgObj: WsMessage) => {
    return (
      <div className={styles.conRight}>
        <div className={styles.descRight}>
          <div className={styles.descTextRight}>{msgObj.message}</div>
          <div className={styles.descTime}>{msgObj.time}</div>
        </div>
        <div className={styles.iconRight}>
          <Icon circular name={'desktop'} size={'large'} />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.msgList} id={'msgCon'}>
      {list.map((item) => {
        if (item.type === 'client') {
          return <Fragment key={item.index}>{renderRight(item)}</Fragment>;
        } else {
          return <Fragment key={item.index}>{renderLeft(item)}</Fragment>;
        }
      })}
    </div>
  );
};

export default MsgList;
