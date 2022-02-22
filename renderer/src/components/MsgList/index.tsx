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

  const renderSystemInfo = (msgObj: WsMessage) => {
    let color = '#DAE0E7';
    if (msgObj.flag) {
      switch (msgObj.flag) {
        case 'good':
          color = '#3FDB0C';
          break;
        case 'bad':
          color = '#F987A3';
          break;
        default:
          color = '#DAE0E7';
          break;
      }
    }

    return (
      <div className={styles.systemInfo}>
        <div className={styles.info} style={{ backgroundColor: color }}>
          <div className={styles.systemInfoText}>{msgObj.message}</div>
          <div className={styles.systemInfoTime}>{msgObj.time}</div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.msgList} id={'msgCon'}>
      {list.map((item) => {
        if (item.type === 'client') {
          return <Fragment key={item.index}>{renderRight(item)}</Fragment>;
        } else if (item.type === 'server') {
          return <Fragment key={item.index}>{renderLeft(item)}</Fragment>;
        } else {
          return <Fragment key={item.index}>{renderSystemInfo(item)}</Fragment>;
        }
      })}
    </div>
  );
};

export default MsgList;
