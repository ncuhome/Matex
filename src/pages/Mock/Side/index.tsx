import React from 'react';
import styles from './index.module.scss';
import { AddApiList, ApiList } from '../../../components/ApiList';

const APISider = () => {
  return (
    <div className={styles.sider}>
      <div className={styles.form}>
        <div className={styles.title}>接口列表</div>
        <ApiList type={'get'} />
        <ApiList type={'get'} />
        <ApiList type={'get'} />
        <ApiList type={'get'} />
        <ApiList type={'get'} />
        <ApiList type={'get'} />
        <AddApiList />
      </div>
      <div className={styles.card}>
        <div>2</div>
      </div>
    </div>
  );
};

export default APISider;
