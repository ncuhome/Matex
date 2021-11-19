import React, { ChangeEvent, useEffect, useState } from 'react';
import { ipcName } from '../../ipc/';
import { ipcRenderer } from 'electron';
import styles from './index.module.scss';
import { Box, Button, InputAdornment, MenuItem, TextField } from '@material-ui/core';

export interface MockData {
  port: string;
  route: string;
  data: string;
}

const currencies = ['Plain Text', 'JSON', 'File', 'Form Data'];

const Mock = () => {
  const [port, setPort] = useState('');
  const [route, setRoute] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    const { ipcRenderer } = require('electron');
    ipcRenderer.on(`${ipcName}-reply`, (event, arg) => {
      console.log(arg);
    });
  }, []);

  const handleClick = async () => {
    const { ipcRenderer } = require('electron');
    console.log({ port, route, data });

    ipcRenderer.send(ipcName, { port, route, data });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    const value = e.target.value;
    if (type === 'port') {
      setPort(value);
    } else if (type === 'route') {
      setRoute(value);
    } else {
      setData(value);
    }
  };

  return (
    <div className={styles.mockCon}>
      <div className={styles.header}>
        <TextField
          size={'medium'}
          fullWidth
          color={'secondary'}
          variant={'outlined'}
          InputProps={{
            readOnly: true,
            color: 'secondary'
          }}
          value={`http:localhost:${port}`}
          className={styles.addressText}
        />
        <Button sx={{ height: 50 }} color={'secondary'} variant="outlined" size="large">
          保存
        </Button>
      </div>
      <Box sx={{ display: 'flex' }} flexDirection={'column'}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
          <Box sx={{ flexGrow: 1, marginRight: 10 }}>
            <Box style={{ color: '#6365F1', marginBottom: 10 }}>请求端口:</Box>
            <TextField
              fullWidth
              variant={'outlined'}
              placeholder={'监听端口'}
              color={'secondary'}
              onChange={(e) => handleChange(e, 'port')}
            />
          </Box>
          <Box sx={{ flexGrow: 1, marginRight: 10 }}>
            <Box style={{ color: '#6365F1', marginBottom: 10 }}>接口路由:</Box>
            <TextField
              fullWidth
              variant={'outlined'}
              placeholder={'接口路由'}
              color={'secondary'}
              InputProps={{
                startAdornment: <InputAdornment position="start">/</InputAdornment>
              }}
              onChange={(e) => handleChange(e, 'route')}
            />
          </Box>
          <Box sx={{ width: 200 }}>
            <Box style={{ color: '#6365F1', marginBottom: 10 }}>返回类型:</Box>
            <TextField
              fullWidth
              select
              variant={'outlined'}
              placeholder={'返回类型'}
              color={'secondary'}
              onChange={(e) => handleChange(e, 'data')}
            >
              {currencies.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
        <Box>
          <TextField
            multiline
            fullWidth
            rows={4}
            color={'secondary'}
            label="返回数据"
            sx={{ height: 200 }}
            onChange={(e) => handleChange(e, 'data')}
          />
        </Box>
      </Box>

      <Button sx={{ width: 100 }} variant={'outlined'} onClick={handleClick}>
        启动
      </Button>
    </div>
  );
};

export default Mock;
