import React from 'react';
import styles from './index.module.scss';
import AddIcon from '@material-ui/icons/Add';

export const ApiCard = () => {
  return (
    <div className={styles.apiCard}>
      <div className={styles.header}>
        <div className={styles.point}>
          <div className={styles.inner} />
        </div>
        <div className={styles.time}>2021/10/29</div>
      </div>
      <div className={styles.info}>
        <div>
          <span className={styles.label}>name:</span>
          <input value={'test'} className={styles.content} />
        </div>
        <div>
          <span className={styles.label}>count:</span>
          <input value={'test'} className={styles.content} />
        </div>
      </div>
    </div>
  );
};

export const AddApiCard = () => {
  return (
    <div className={styles.apiCard}>
      <AddIcon sx={{ transform: 'scale(1.2)' }} />
    </div>
  );
};
