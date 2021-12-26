import { Button, Icon, Popup, Segment, Table } from 'semantic-ui-react';
import React, { Fragment, useEffect } from 'react';
import { useBodyList, useUrlConfig } from '../../../../zustand/store/collection.store';
import styles from './index.module.scss';

const renderBodyTable = () => {
  const { updateBody, bodyList, addBody, deleteBody } = useBodyList((state) => state);
  const { method } = useUrlConfig((state) => state);

  useEffect(() => {
    const len = bodyList.length;
    if (len) {
      if (bodyList[len - 1].key && bodyList[len - 1].value) {
        addBody({ index: len, key: '', value: '' });
      }
    }
  }, [bodyList]);
  if (method === 'Get') {
    return (
      <Segment style={{ marginTop: 10 }} color="red" textAlign={'center'}>
        <Icon name={'warning sign'} color={'red'} />
        <span style={{ color: 'red' }}>&nbsp;当为Get请求时,无此配置</span>
      </Segment>
    );
  } else {
    return (
      <Table celled compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={3}>键</Table.HeaderCell>
            <Table.HeaderCell width={6}>值</Table.HeaderCell>
            <Table.HeaderCell width={4} textAlign={'center'}>
              操作
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {bodyList.map((item, index) => {
            return (
              <Fragment key={item.index}>
                <Table.Row>
                  <Table.Cell textAlign={'center'}>
                    <input
                      className={styles.input}
                      value={item.key}
                      onChange={(e) => {
                        updateBody(index, 'key', e.target.value);
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign={'center'}>
                    <div className={styles.bodyCell}>
                      <input
                        className={styles.input}
                        value={item.value}
                        onChange={(e) => {
                          updateBody(index, 'value', e.target.value);
                        }}
                      />
                      <Button.Group basic size="mini">
                        <Button icon="eye" disabled />
                        <Popup position="bottom center" on={'click'} trigger={<Button icon="file" />} flowing>
                          1
                        </Popup>
                      </Button.Group>
                    </div>
                  </Table.Cell>
                  <Table.Cell textAlign={'center'}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <Button icon compact>
                        <Icon name="expand arrows alternate" />
                      </Button>
                      <Button icon compact onClick={() => deleteBody(item.index)}>
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
  }
};

export default renderBodyTable;
