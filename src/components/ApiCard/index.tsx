import React from 'react';
import styles from './index.module.scss';
import AddIcon from '@material-ui/icons/Add';
import { myEmitter } from '../../utils/EventEmiter';

export const ApiCard = () => {
  const onFocus = () => {
    myEmitter.emit<boolean>('inputFocus', true);
  };

  const onBlur = () => {
    myEmitter.emit<boolean>('inputFocus', false);
  };

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
          <input onFocus={onFocus} onBlur={onBlur} value={'test'} className={styles.content} />
        </div>
        <div>
          <span className={styles.label}>count:</span>
          <input onFocus={onFocus} onBlur={onBlur} value={'test'} className={styles.content} />
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
