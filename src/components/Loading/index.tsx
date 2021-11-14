import React from 'react';
import styles from './index.module.scss';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingSquare}>
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loading;
