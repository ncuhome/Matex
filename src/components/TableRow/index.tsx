import React from 'react';
import styles from './index.module.scss';
import TableInput from '../TableInput';
import { ApiData } from '../../type/api';

interface TableRowProps {
  index: number;
  apiData: ApiData;
}

const TableRow: React.FC<TableRowProps> = ({ index, apiData }) => {
  const { id, route, type, resData, desc } = apiData;

  return (
    <div className={styles.tableRow}>
      <div className={styles.tableItem}>{id}</div>
      <div className={styles.tableItem}>
        <TableInput defaultValue={route} index={index} keyType={'route'} />
      </div>
      <div className={styles.tableItem}>
        <TableInput defaultValue={type} index={index} keyType={'type'} />
      </div>
      <div className={styles.tableItem}>
        <TableInput defaultValue={resData} index={index} keyType={'resData'} />
      </div>
      <div className={styles.tableItem}>
        <TableInput defaultValue={desc} index={index} keyType={'desc'} />
      </div>
    </div>
  );
};

export default React.memo(TableRow);
