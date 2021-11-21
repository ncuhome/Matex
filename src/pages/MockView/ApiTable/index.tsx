import React, { Fragment } from 'react';
import styles from './index.module.scss';
import TableRow from '../../../components/TableRow';
import { useApiDataStore } from '../../../zustand/store/apiData.store';

const ApiTable = () => {
  const apiList = useApiDataStore((state) => state.apiList);
  console.log(apiList[0]);
  return (
    <div className={styles.apiTable}>
      <div className={styles.header}>
        <div className={styles.headerItem}>ID</div>
        <div className={styles.headerItem}>路由</div>
        <div className={styles.headerItem}>类型</div>
        <div className={styles.headerItem}>返回值</div>
        <div className={styles.headerItem}>描述</div>
        <div className={styles.headerItem}>操作</div>
      </div>
      <div className={styles.tableBody}>
        {apiList.map((item, index) => {
          return (
            <Fragment key={item.id}>
              <TableRow apiData={item} index={index} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ApiTable;
