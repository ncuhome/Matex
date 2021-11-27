import React from 'react';
import styles from './index.module.scss';
import Input from '../../../components/ApiList';
import ApiList from '../../../components/ApiList';

const APISider = () => {
  return (
    <div className={styles.sider}>
      <div className={styles.form}>
        <div>
          <ApiList type={'get'} />
        </div>
      </div>
      <div className={styles.card}>
        <div>2</div>
      </div>
    </div>
  );
};

export default APISider;
