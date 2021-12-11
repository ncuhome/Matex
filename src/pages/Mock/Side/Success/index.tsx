import React from 'react';
import styles from './index.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ChildType } from '../index';

const Success = ({ onClick }: ChildType) => {
  return (
    <div className={styles.con}>
      <div className={styles.start} onClick={onClick}>
        <div className={styles.img}>
          <CheckCircleIcon sx={{ fontSize: 70, color: 'rgba(33,200,84,0.8)' }} />
        </div>
        <div className={styles.text}>已在运行,点击停止</div>
      </div>
    </div>
  );
};

export default Success;
