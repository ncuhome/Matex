import { Button, Icon, Popup, Segment, Table } from 'semantic-ui-react';
import React, { Fragment, useEffect, useMemo } from 'react';
import { useBodyList, useUrlConfig } from '../../../../zustand/store/collection.store';
import styles from './index.module.scss';
import { BodyTypes } from '../../../../Model/collection.model';

const BodyTable = () => {
  const { updateBody, type, bodyList, addBody, deleteBody } = useBodyList((state) => state);
  const { method } = useUrlConfig((state) => state);
  console.log(bodyList);

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
        {useMemo(() => {
          return (
            <div>
              <Icon name={'warning sign'} color={'red'} />
              <span style={{ color: 'red' }}>&nbsp;当为Get请求时,无此配置</span>
            </div>
          );
        }, [bodyList, method])}
      </Segment>
    );
  } else {
    return (
      <Table celled compact size={'small'}>
        <Table.Header>
          <Table.Row style={{ background: '#FFF' }}>
            <Table.HeaderCell width={3}>键</Table.HeaderCell>
            <Table.HeaderCell>值</Table.HeaderCell>
            <Table.HeaderCell width={3} textAlign={'center'}>
              操作
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {useMemo(() => {
          return (
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
                            console.log('change');
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
                            <Popup
                              position="bottom center"
                              on={'click'}
                              trigger={<Button icon="file" />}
                              flowing
                            >
                              <Button.Group vertical>
                                {BodyTypes.map((item) => {
                                  return (
                                    <Fragment key={item}>
                                      <Button>
                                        <Icon name="file" />
                                        {item}
                                      </Button>
                                    </Fragment>
                                  );
                                })}
                              </Button.Group>
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
          );
        }, [bodyList, method])}
      </Table>
    );
  }
};

export default BodyTable;
