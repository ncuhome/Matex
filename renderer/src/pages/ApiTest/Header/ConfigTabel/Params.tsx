import React, { Fragment, useEffect } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import styles from './index.module.scss';
import { useApiTestConfig, apiTestParamsAtom } from '/@/store/apiTestStore';

const ParamsTable = () => {
  const [paramList, updateParamKey, updateParamValue, addApiTestParam, deleteApiTestParam] =
    useApiTestConfig(apiTestParamsAtom);

  useEffect(() => {
    const len = paramList.length;
    if (len) {
      if (paramList[len - 1].key.trim() && paramList[len - 1].value) {
        addApiTestParam({ key: '', value: '' });
      }
    }
  }, [paramList]);

  return (
    <Table celled compact size={'small'}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={3}>键</Table.HeaderCell>
          <Table.HeaderCell>值</Table.HeaderCell>
          <Table.HeaderCell width={3} textAlign={'center'}>
            操作
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {paramList.map((item, index) => {
          return (
            <Fragment key={item.index}>
              <Table.Row>
                <Table.Cell textAlign={'center'}>
                  <input
                    className={styles.input}
                    value={item.key}
                    onChange={(e) => {
                      updateParamKey(index, e.target.value);
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <input
                    className={styles.input}
                    value={item.value}
                    onChange={(e) => {
                      updateParamValue(index, e.target.value);
                    }}
                  />
                </Table.Cell>
                <Table.Cell textAlign={'center'}>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button icon compact>
                      <Icon name="expand arrows alternate" />
                    </Button>
                    <Button icon compact onClick={() => deleteApiTestParam(item.index)}>
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

export default ParamsTable;
