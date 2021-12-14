import React from 'react';
import styles from './index.module.scss';
import { ChildType } from '../index';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = ({ onClick }: ChildType) => {
  return (
    <div className={styles.con}>
      <div className={styles.start} onClick={onClick}>
        <div className={styles.img}>
          <CheckCircleIcon sx={{ fontSize: 60, color: '#00FF80' }} />
        </div>
        <div className={styles.text}>已在运行,点击停止</div>
      </div>
    </div>
  );
};

export default Success;
