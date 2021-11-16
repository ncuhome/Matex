import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Flex, Input } from '@chakra-ui/react';
import { ipcName } from '../../ipc/';
import { ipcRenderer } from 'electron';

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
    ipcRenderer.send(ipcName, { port, route, data });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
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
    <>
      <Flex bg="white" w="100%" p={4} h={100} color="white">
        <Input placeholder={'端口'} onChange={(e) => handleChange(e, 'port')} />
        <Input placeholder={'接口路由'} onChange={(e) => handleChange(e, 'route')} />
        <Input placeholder={'接口数据'} onChange={(e) => handleChange(e, 'data')} />
      </Flex>
      <Button bg={'blue'} color={'white'} onClick={handleClick}>
        生成
      </Button>
    </>
  );
};

export default Mock;
