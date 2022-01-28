import React, { Fragment } from 'react';
import { Button, Icon, Popup, Table } from 'semantic-ui-react';
import styles from './index.module.scss';
import { BodyTypes } from '/@/model/apiTest.model';
import { ApiTestKVProps } from '/@/store/apiTestStore/type';

interface KVTableProps {
  data: ApiTestKVProps[];
  file: boolean;
  onChangeKey?: (index: number, value: string) => void;
  onChangeValue?: (index: number, value: string) => void;
  onDeleteLine?: (index: number) => void;
}

const KVTable: React.FC<KVTableProps> = ({ data, file, onChangeKey, onChangeValue, onDeleteLine }) => {
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
      <Table.Body>
        {data.map((item, index) => {
          return (
            <Fragment key={item.index}>
              <Table.Row>
                <Table.Cell textAlign={'center'}>
                  <input
                    className={styles.input}
                    value={item.key}
                    onChange={(e) => {
                      onChangeKey && onChangeKey(index, e.target.value);
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <div className={styles.bodyCell}>
                    <input
                      className={styles.input}
                      value={item.value}
                      onChange={(e) => {
                        onChangeValue && onChangeValue(index, e.target.value);
                      }}
                    />
                    {file && (
                      <Button.Group basic size="mini">
                        <Button icon="eye" disabled />
                        <Popup position="bottom center" on={'click'} trigger={<Button icon="file" />} flowing>
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
                    )}
                  </div>
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button icon compact>
                      <Icon name="expand arrows alternate" />
                    </Button>
                    <Button icon compact onClick={() => onDeleteLine && onDeleteLine(item.index)}>
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

export default KVTable;
