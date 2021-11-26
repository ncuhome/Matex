import React, { Fragment, useMemo } from 'react';
import styles from './index.module.scss';

const APISider = () => {
  return (
    <div className={styles.sider}>
      <div className={styles.form}>
        <div>1</div>
      </div>
      <div className={styles.card}>
        <div>2</div>
      </div>
    </div>
  );
};

export default APISider;
