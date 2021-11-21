import React from 'react';
import styles from './index.module.scss';
import TableInput from '../TableInput';
import { ApiData } from '../../type/api';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

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
        {/*<TableInput defaultValue={resData} index={index} keyType={'resData'} />*/}
        <Button variant={'outlined'} size={'small'} color={'primary'}>
          编辑
        </Button>
      </div>
      <div className={styles.tableItem}>
        <TableInput defaultValue={desc} index={index} keyType={'desc'} />
      </div>
      <div className={styles.tableItem}>
        <Button startIcon={<AddIcon />} size={'small'} variant={'outlined'} color={'secondary'}>
          添加
        </Button>
        <Button startIcon={<ClearIcon />} size={'small'} sx={{ ml: 1 }} variant={'outlined'} color={'error'}>
          删除
        </Button>
      </div>
    </div>
  );
};

export default React.memo(TableRow);
