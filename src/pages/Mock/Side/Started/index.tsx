import React from 'react';
import styles from './index.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ChildType } from '../index';

const Started = ({ onClick }: ChildType) => {
  return (
    <div className={styles.con}>
      <div className={styles.start} onClick={onClick}>
        <div>
          <CheckCircleIcon sx={{ fontSize: 80, color: '#546CF7' }} />
        </div>
        <div className={styles.text}>已在运行,点击停止</div>
      </div>
    </div>
  );
};

export default Started;
