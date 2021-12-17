import React from 'react';
import styles from './index.module.scss';
import MonacoEditor from '../../components/MonacoEditor';
import { myEmitter } from '../../utils/EventEmiter';
import { Window } from '../../type';
import { Button, ButtonGroup, Input, Select } from '@geist-ui/react';
import { MethodsOptions } from '../../Model/request.model';

const Collection = () => {
  const handleClick = async () => {
    const res = await Window.Mixos.get('http://localhost:9000/test');
    myEmitter.emit<string>('monacoEditor-collect', JSON.stringify(res));
  };

  return (
    <div className={styles.collection}>
      <div className={styles.header}>
        <Select placeholder="请求方式" style={{ minWidth: '0px' }} w={6}>
          {MethodsOptions.map((item, index) => {
            return (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            );
          })}
        </Select>
        <Input placeholder="一个基础示例" />
        <Button onClick={handleClick}>发送</Button>
      </div>
      <div className={styles.edit}>
        <div className={styles.btnGroup}>
          <ButtonGroup>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </div>
        <MonacoEditor name={'collect'} language={'json'} defaultVal={''} height={300} width={'100%'} />
      </div>
    </div>
  );
};

export default Collection;
