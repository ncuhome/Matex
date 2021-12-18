import React from 'react';
import styles from './index.module.scss';
import { myEmitter } from '../../utils/EventEmiter';
import { Window } from '../../type';
import { NavTabProps } from '../../components/NavTabs';
import MonacoEditor from '../../components/MonacoEditor';
import { MethodsOptions } from '../../Model/request.model';
import { Button, Input, Select } from '@geist-ui/react';

const list: NavTabProps[] = [
  {
    name: '测试一',
    value: '1'
  },
  {
    name: '测试二',
    value: '2'
  },
  {
    name: '测试三',
    value: '3'
  }
];

const Collection = () => {
  const handleClick = async () => {
    const res = await Window.Mixos.get('http://localhost:9000/test');
    myEmitter.emit<string>('monacoEditor-collect', JSON.stringify(res));
  };

  return (
    <div className={styles.collection}>
      <div className={styles.header}>
        <div className={styles.url}>
          <Select placeholder="请求方式" height={1.2} style={{ minWidth: '0px' }} w={7} mx={1}>
            {MethodsOptions.map((item, index) => {
              return (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              );
            })}
          </Select>
          <Input height={1.2} value={'http://localhost:8080/m'} width={'100%'} onChange={() => {}} />
          <Button onClick={handleClick} auto mx={1}>
            发送
          </Button>
        </div>
        <div className={styles.config}></div>
      </div>
      <div className={styles.body}>
        <div className={styles.editor}>
          <MonacoEditor name={'collect'} language={'json'} defaultVal={''} height={200} width={'100%'} />
        </div>
      </div>
      {/*<div className={styles.left}>*/}
      {/*  */}
      {/*</div>*/}
      <div className={styles.side} />

      {/*<div className={styles.edit}>*/}
      {/*  <div className={styles.btnGroup}>*/}
      {/*    <ButtonGroup>*/}
      {/*      <Button>One</Button>*/}
      {/*      <Button>Two</Button>*/}
      {/*      <Button>Three</Button>*/}
      {/*    </ButtonGroup>*/}
      {/*  </div>*/}
      {/*  <MonacoEditor name={'collect'} language={'json'} defaultVal={''} height={300} width={'100%'} />*/}
      {/*</div>*/}
    </div>
  );
};

export default Collection;
