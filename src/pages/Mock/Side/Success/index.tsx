import React from 'react';
import styles from './index.module.scss';
import { ChildType } from '../index';
import Check from '@geist-ui/react-icons/check';

const Success = ({ onClick }: ChildType) => {
  return (
    <div className={styles.con}>
      <div className={styles.start} onClick={onClick}>
        <div className={styles.img}>
          <Check />
        </div>
        <div className={styles.text}>已在运行,点击停止</div>
      </div>
    </div>
  );
};

export default Success;
