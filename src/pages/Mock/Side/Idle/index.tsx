import React from 'react';
import styles from './index.module.scss';
import { ChildType } from '../index';
import planeIcon from '../../../../assets/icon/planefill.svg';

const Idle = ({ onClick }: ChildType) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.con}>
        <div className={styles.imgCon}>
          <img src={planeIcon} className={styles.plane} alt={'planeIcon'} />
        </div>
        <div className={styles.buttonOuter}>启动</div>
      </div>
    </div>
  );
};

export default Idle;
