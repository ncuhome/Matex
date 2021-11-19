import React, { ChangeEvent, useEffect, useState } from 'react';
import { ipcName } from '../../ipc/';
import { ipcRenderer } from 'electron';
import styles from './index.module.scss';
import { Box, Button, Input, TextField } from '@material-ui/core';

export interface MockData {
  port: string;
  route: string;
  data: string;
}

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
          color={'success'}
          variant={'outlined'}
          InputProps={{
            readOnly: true
          }}
          value={`http:localhost:${port}`}
          className={styles.addressText}
        />
        <Button sx={{ height: 50 }} color={'secondary'} variant="outlined" size="large">
          保存
        </Button>
      </div>
      <Box sx={{ display: 'flex' }} flexDirection={'column'}>
        <Box sx={{ display: 'flex', color: 'white', justifyContent: 'space-around', marginBottom: 2 }}>
          <TextField
            sx={{ flexGrow: 1, marginRight: 2 }}
            variant={'outlined'}
            label={'监听端口'}
            onChange={(e) => handleChange(e, 'port')}
          />
          <TextField
            sx={{ flexGrow: 1 }}
            variant={'outlined'}
            label={'接口路由'}
            onChange={(e) => handleChange(e, 'route')}
          />
        </Box>
        <div>
          <TextField
            multiline
            fullWidth
            rows={4}
            label="返回数据"
            sx={{ height: 200 }}
            onChange={(e) => handleChange(e, 'data')}
          />
        </div>
      </Box>
      <Button className={styles.startBtn} onClick={handleClick}>
        启动
      </Button>
    </div>
  );
};

export default Mock;
