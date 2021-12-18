import React from 'react';
import styles from './index.module.scss';
import { myEmitter } from '../../utils/EventEmiter';
import { Window } from '../../type';
import MonacoEditor from '../../components/MonacoEditor';
import { MethodsOptions } from '../../Model/request.model';
import { Button, ButtonGroup, Input, Select, Table } from '@geist-ui/react';
import CollectSide from './Side';

const Collection = () => {
  const dataSource = [
    { key: 'type', value: 'Content type', operation: '' },
    { key: 'Component', value: 'DOM element to use', operation: '' },
    { key: '<Text >bold</Text>', value: 'Bold style', operation: '' }
  ];
  const handleClick = async () => {
    const res = await Window.Mixos.get('http://localhost:9000/test');
    myEmitter.emit<string>('monacoEditor-collect', JSON.stringify(res));
  };

  const [data, setData] = React.useState(dataSource);
  const renderAction = (value: any, rowData: any, index: number) => {
    const removeHandler = () => {
      setData((last) => last.filter((_, dataIndex) => dataIndex !== index));
    };
    return (
      <Button type="error" auto scale={1 / 3} onClick={removeHandler}>
        Remove
      </Button>
    );
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
            <Table data={data} onChange={(value) => setData(value)}>
              <Table.Column prop="key" label="key" />
              <Table.Column prop="value" label="value" />
              <Table.Column prop="operation" label="operation" width={150} render={renderAction} />
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
