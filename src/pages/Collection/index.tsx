import React from 'react';
import styles from './index.module.scss';
import { myEmitter } from '../../utils/EventEmiter';
import { Window } from '../../type';
import { NavTabProps } from '../../components/NavTabs';
import MonacoEditor from '../../components/MonacoEditor';
import { MethodsOptions } from '../../Model/request.model';
import { Button, ButtonGroup, Input, Select, Table } from '@geist-ui/react';
import CollectSide from './Side';

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
  const data = [
    { property: 'type', description: 'Content type', type: 'secondary | warning', default: '-' },
    { property: 'Component', description: 'DOM element to use', type: 'string', default: '-' },
    { property: 'bold', description: 'Bold style', type: 'boolean', default: 'true' }
  ];
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
        <div className={styles.config}>
          <div className={styles.leftBtns}>
            <ButtonGroup vertical>
              <Button>Params</Button>
              <Button>Auth</Button>
              <Button>Headers</Button>
              <Button>Body</Button>
            </ButtonGroup>
          </div>
          <div className={styles.table}>
            <Table data={data}>
              <Table.Column prop="property" label="Key" />
              <Table.Column prop="description" label="Value" />
              <Table.Column prop="type" label="type" />
              <Table.Column prop="default" label="default" />
            </Table>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.editor}>
          <MonacoEditor name={'collect'} language={'json'} defaultVal={''} height={250} width={'100%'} />
        </div>
      </div>
      <div className={styles.side}>
        <CollectSide />
      </div>
    </div>
  );
};

export default Collection;
