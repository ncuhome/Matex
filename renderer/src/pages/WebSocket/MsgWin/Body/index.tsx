import React from 'react';
import styles from './index.module.scss';
import starSvg from '/@/assets/icon/star.svg';
import { useMsgList } from '/@/store/websocketStore';
import MsgList from '/@cmp/MsgList';
import clsx from 'clsx';

const MsgWinBody = () => {
  const { msgList } = useMsgList();

  const isRender = msgList.length > 0;

  return (
    <div className={styles.body}>
      <div className={styles.msgCon}>{isRender && <MsgList list={msgList} />}</div>
      <img src={starSvg} className={clsx([styles.img, isRender && styles.fade])} alt={'img'} />
    </div>
  );
};

export default MsgWinBody;
