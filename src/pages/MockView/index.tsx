import React, { ChangeEvent, useEffect, useState } from 'react';
import { ipcName } from '../../ipc/';
import { ipcRenderer } from 'electron';
import styles from './index.module.scss';
import useObject from '../../hooks/useObject';
import { MockData } from './types';
import HistoryApiTab from './HistoryTabs';
import AddressBanner from './AddressBanner';
import ApiTable from './ApiTable';
import MonacoEditor from '../../components/MonacoEditor';

const currencies = ['Plain Text', 'JSON', 'File', 'Form Data'];

const Mock = () => {
  const [mockInfo, setMockInfo] = useObject<MockData>();
  const [focus, setFocus] = useState(true);
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

  const onBlur = () => {
    setFocus(false);
  };
  const onFocus = () => {
    setFocus(true);
  };

  return (
    <div className={styles.mockCon}>
      <HistoryApiTab />
      <AddressBanner />
      <ApiTable />
    </div>
  );
};

export default Mock;
