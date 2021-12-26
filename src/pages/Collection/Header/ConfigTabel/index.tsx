import React, { Fragment, useEffect, useState } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import { myEmitter } from '../../../../utils/EventEmiter';
import { TabItems } from '../../../../type/collection';
import { BodyType } from '../../../../zustand/type/collection.type';
import { useHeaders, useParams, useUrlConfig } from '../../../../zustand/store/collection.store';
import styles from './index.module.scss';

const ConfigTable = () => {
  const [type, setType] = useState<TabItems>('Params');
  const { method, url } = useUrlConfig((state) => state);

  console.log(method);
  useEffect(() => {
    myEmitter.on<TabItems>('collection-config', (data) => {
      setType(data);
    });
  }, []);

  switch (type) {
    case 'Params':
      return renderParamsTable();
    case 'Body':
      return renderParamsTable();
    case 'Headers':
      return renderHeadersTable();
    case 'Auth':
      return renderParamsTable();
  }
};

const renderParamsTable = () => {
  const { updateParam, paramList, addParam, deleteParam } = useParams((state) => state);
  console.log(paramList);

  useEffect(() => {
    const len = paramList.length;
    if (len) {
      if (paramList[len - 1].key && paramList[len - 1].value) {
        addParam({ index: len, key: '', value: '' });
      }
    }
  }, [paramList]);

  return (
    <Table celled compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>键</Table.HeaderCell>
          <Table.HeaderCell>值</Table.HeaderCell>
          <Table.HeaderCell width={4} textAlign={'center'}>
            操作
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {paramList.map((item, index) => {
          console.log(item);
          return (
            <Fragment key={item.index}>
              <Table.Row>
                <Table.Cell textAlign={'center'}>
                  <input
                    className={styles.input}
                    value={item.key}
                    onChange={(e) => {
                      updateParam(index, 'key', e.target.value);
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <input
                    className={styles.input}
                    value={item.value}
                    onChange={(e) => {
                      updateParam(index, 'value', e.target.value);
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button icon compact>
                      <Icon name="expand arrows alternate" />
                    </Button>
                    <Button icon compact onClick={() => deleteParam(item.index)}>
                      <Icon name="delete" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
};
const renderHeadersTable = () => {
  const { updateHeader, headerList, addHeader, deleteHeader } = useHeaders((state) => state);

  useEffect(() => {
    const len = headerList.length;
    if (len) {
      if (headerList[len - 1].key && headerList[len - 1].value) {
        addHeader({ index: len, key: '', value: '' });
      }
    }
  }, [headerList]);

  return (
    <Table celled compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>键</Table.HeaderCell>
          <Table.HeaderCell>值</Table.HeaderCell>
          <Table.HeaderCell width={4} textAlign={'center'}>
            操作
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {headerList.map((item, index) => {
          console.log(item);
          return (
            <Fragment key={item.index}>
              <Table.Row>
                <Table.Cell textAlign={'center'}>
                  <input
                    className={styles.input}
                    value={item.key}
                    onChange={(e) => {
                      updateHeader(index, 'key', e.target.value);
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <input
                    className={styles.input}
                    value={item.value}
                    onChange={(e) => {
                      updateHeader(index, 'value', e.target.value);
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button icon compact>
                      <Icon name="expand arrows alternate" />
                    </Button>
                    <Button icon compact onClick={() => deleteHeader(item.index)}>
                      <Icon name="delete" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
};

const renderBodyTable = (list: BodyType[]) => {
  return (
    <Table celled striped compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={3}>键</Table.HeaderCell>
          <Table.HeaderCell>值</Table.HeaderCell>
          <Table.HeaderCell width={4} textAlign={'center'}>
            操作
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {list.map((item) => {
          return (
            <Fragment key={item.key}>
              <Table.Row>
                <Table.Cell textAlign={'center'}>{item.key}</Table.Cell>
                <Table.Cell textAlign={'center'}>{item.value}</Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button icon compact>
                      <Icon name="expand arrows alternate" />
                    </Button>
                    <Button icon compact>
                      <Icon name="delete" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default ConfigTable;
