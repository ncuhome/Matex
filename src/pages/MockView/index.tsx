import React, { ChangeEvent, useEffect, useState } from 'react';
import { ipcName } from '../../ipc/';
import { ipcRenderer } from 'electron';
import styles from './index.module.scss';
import { Box, Button, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import Index from '../../components/JsonEdit';
import useObject from '../../hooks/useObject';
import { MockData } from './types';
import HistoryApiTab from './History';

const currencies = ['Plain Text', 'JSON', 'File', 'Form Data'];

const Mock = () => {
  const [mockInfo, setMockInfo] = useObject<MockData>();

  useEffect(() => {
    const { ipcRenderer } = require('electron');
    ipcRenderer.on(`${ipcName}-reply`, (event, arg) => {
      console.log(arg);
    });
  }, []);

  const handleClick = async () => {
    const { ipcRenderer } = require('electron');
    console.log(mockInfo);

    ipcRenderer.send(ipcName, mockInfo);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    const value = e.target.value as any;
    if (type === 'port') {
      setMockInfo({ port: value });
    } else if (type === 'route') {
      setMockInfo({ route: value });
    } else {
      setMockInfo({ type: value });
    }
  };
  console.log(mockInfo);

  const onChange = (value: any) => {
    setMockInfo({ data: value.jsObject ?? {} });
  };

  return (
    <div className={styles.mockCon}>
      <HistoryApiTab />
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
          value={`http:localhost:${mockInfo.port}`}
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
              defaultValue={''}
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
          <Index onChange={onChange} />
        </Box>
      </Box>

      <Button sx={{ width: 100 }} variant={'outlined'} onClick={handleClick}>
        启动
      </Button>
    </div>
  );
};

export default Mock;
