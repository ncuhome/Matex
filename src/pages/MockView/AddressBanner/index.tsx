import React from 'react';
import styles from './index.module.scss';
import { Button, MenuItem, TextField } from '@material-ui/core';

const methods = ['Post', 'Get', 'delete', 'Put'];

const AddressBanner = () => {
  return (
    <div className={styles.con}>
      <TextField
        sx={{ width: 100 }}
        select
        size={'small'}
        defaultValue={'Get'}
        variant={'outlined'}
        placeholder={'返回类型'}
        color={'secondary'}
      >
        {methods.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      <div className={styles.address}>https:baidu.com</div>
      <Button variant={'outlined'}>保存</Button>
    </div>
  );
};

export default AddressBanner;
