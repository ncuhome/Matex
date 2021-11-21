import React from 'react';
import styles from './index.module.scss';

const ApiTable = () => {
  return (
    <div className={styles.apiTable}>
      <div className={styles.header}>
        <div className={styles.headerItem}>ID</div>
        <div className={styles.headerItem}>路由</div>
        <div className={styles.headerItem}>类型</div>
        <div className={styles.headerItem}>返回值</div>
        <div className={styles.headerItem}>操作</div>
      </div>
      <div className={styles.tableBody}>
        <div className={styles.bodyItem}>ID</div>
        <div className={styles.bodyItem}>路由</div>
        <div className={styles.bodyItem}>ID</div>
        <div className={styles.bodyItem}>ID</div>
        <div className={styles.bodyItem}>ID</div>
      </div>
    </div>
  );
};

export default ApiTable;
