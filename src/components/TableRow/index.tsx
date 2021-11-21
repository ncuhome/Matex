import React, { Fragment } from 'react';
import styles from './index.module.scss';
import TableInput from '../TableInput';
import { ApiData } from '../../type/api';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import { useApiDataStore } from '../../zustand/store/apiData.store';

const options = ['JSON', 'Plain Text', 'File', 'Form Data'];

interface TableRowProps {
  index: number;
  apiData: ApiData;
}

const TableRow: React.FC<TableRowProps> = ({ index, apiData }) => {
  const { id, route, type, resData, desc } = apiData;
  const setApi = useApiDataStore((state) => state.setApi);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    console.log(e);
    const { value } = e.target;
    setApi(index, 'type', value);
  };

  return (
    <div className={styles.tableRow}>
      <div className={styles.tableItem}>{id}</div>
      <div className={styles.tableItem}>
        <TableInput defaultValue={route} index={index} keyType={'route'} />
      </div>
      <div className={styles.tableItem}>
        <div className={styles.select}>
          <select placeholder={'请选择类型'} onChange={handleChange}>
            {options.map((option) => {
              return (
                <Fragment key={option}>
                  <option value={option}>{option}</option>
                </Fragment>
              );
            })}
          </select>
        </div>
      </div>
      <div className={styles.tableItem}>
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
