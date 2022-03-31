import React from 'react';
import styles from './index.module.scss';
import { useAtomValue } from 'jotai/utils';
import { startBtnAtom } from '/@/store/commonStore';
import { Emitter } from '/@/utils/EventEmiter';

const StartBtn: React.FC = () => {
  const { text, className } = useAtomValue(startBtnAtom);

  const handleClick = () => {
    Emitter.emit('startBtn.click', className);
  };

  return (
    <div className={styles.startBtn} onClick={() => handleClick()}>
      <div className={styles[className]}>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};

export default StartBtn;
