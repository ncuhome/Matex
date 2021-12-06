import React from 'react';
import styles from './index.module.scss';
import { ChildType } from '../index';

const Loading = ({ onClick }: ChildType) => {
  return (
    <div className={styles.loadingCon} onClick={onClick}>
      <div className={styles.con}>
        <div className={styles.loading}>
          <div className={styles.arc} />
          <div className={styles.arc} />
          <div className={styles.arc} />
        </div>
      </div>
      <div className={styles.text}>启动中,点击取消</div>
    </div>
  );
};

export default Loading;
