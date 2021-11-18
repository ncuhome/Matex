import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Flex, Input, Textarea, Center } from '@chakra-ui/react';
import { ipcName } from '../../ipc/';
import { ipcRenderer } from 'electron';
import styles from './index.module.scss';

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
        <Input value={`http:localhost:${port}`} className={styles.addressText} readOnly />
        <div className={styles.saveBtn}>保存</div>
      </div>
      <Flex flexDirection={'column'}>
        <Flex bg="white" h={100} mt={6} color="white">
          <Input mr={5} placeholder={'监听端口'} onChange={(e) => handleChange(e, 'port')} />
          <Input mr={5} placeholder={'接口路由'} onChange={(e) => handleChange(e, 'route')} />
        </Flex>
        <div>
          <Textarea
            placeholder="json返回值"
            resize={'none'}
            style={{ height: 200 }}
            onChange={(e) => handleChange(e, 'data')}
          />
        </div>
      </Flex>
      <Center>
        <div className={styles.startBtn} onClick={handleClick}>
          启动
        </div>
      </Center>
    </div>
  );
};

export default Mock;
