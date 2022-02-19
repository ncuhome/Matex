import styles from './index.module.scss';

import React from 'react';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { websocketSocketIoAtom } from '/@/store/websocketStore';

const Body = () => {
  const [isSocketIo, setSocket] = useAtom(websocketSocketIoAtom);

  const handleClick = (socket: boolean) => {
    if (socket) {
      !isSocketIo && setSocket(true);
    } else {
      isSocketIo && setSocket(false);
    }
  };

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
      </div>

      <div className={styles.inputCon}></div>
    </div>
  );
};

export default Body;
