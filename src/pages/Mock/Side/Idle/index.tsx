import React from 'react';
import styles from './index.module.scss';
import { ChildType } from '../index';

const Idle = ({ onClick }: ChildType) => {
  return (
    <div className={styles.card}>
      <div className={styles.buttonOuter} onClick={onClick}>
        启动
      </div>
    </div>
  );
};

export default Idle;
