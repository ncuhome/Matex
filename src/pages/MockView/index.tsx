import React, { ChangeEvent, useEffect } from 'react';
import { ipcName } from '../../ipc/';
import { ipcRenderer } from 'electron';
import styles from './index.module.scss';
import { Box, Button, InputAdornment, MenuItem, TextField } from '@material-ui/core';
import JsonEdit from '../../components/JsonEdit';
import useObject from '../../hooks/useObject';
import { MockData } from './types';
import HistoryApiTab from './HistoryTabs';
import AddressBanner from './AddressBanner';
import ApiTable from './ApiTable';

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

  const onChange = (e: any) => {
    console.log(e);
  };

  return (
    <div className={styles.mockCon}>
      <HistoryApiTab />
      <AddressBanner />
      <ApiTable />
      <JsonEdit onChange={onChange} />
    </div>
  );
};

export default Mock;
