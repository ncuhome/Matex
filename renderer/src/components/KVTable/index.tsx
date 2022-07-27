import React, { Fragment } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import styles from './index.module.scss';
import { ApiTestFormData, ApiTestKVProps } from '/@/store/apiTestStore/type';
import clsx from 'clsx';
import renderHeader from '/@cmp/KVTable/renderHeader';

export interface KVTableProps {
  data: ApiTestKVProps[] | ApiTestFormData[];
  file?: boolean;
  onChangeKey?: (index: number, value: string) => void;
  onChangeValue?: (index: number, value: string) => void;
  onDeleteLine?: (index: number) => void;
}

const KVTable: React.FC<KVTableProps> = ({
  data,
  file = false,
  onChangeKey,
  onChangeValue,
  onDeleteLine
}) => {
  const [isFile, setFile] = React.useState(false);

  return (
    <Table celled compact className={styles.table} size={'small'}>
      {renderHeader()}
      <Table.Body>
        {data.map((item, index) => {
          return (
            <Fragment key={index}>
              <Table.Row>
                <Table.Cell
                  textAlign={'center'}
                  className={clsx([styles.border, styles.hidTop, styles.cell])}
                >
                  <input
                    className={styles.input}
                    value={item.key}
                    onChange={(e) => {
                      onChangeKey && onChangeKey(index, e.target.value);
                    }}
                  />
                </Table.Cell>
                <Table.Cell
                  textAlign={'center'}
                  className={clsx([styles.border, styles.hidTop, styles.hidLeft, styles.cell])}
                >
                  <div className={styles.bodyCell}>
                    {file && isFile ? (
                      <input
                        className={styles.input}
                        value={item.value}
                        type={'file'}
                        onChange={(e) => {
                          onChangeValue && onChangeValue(index, e.target.value);
                        }}
                      />
                    ) : (
                      <input
                        className={styles.input}
                        value={item.value}
                        type={'text'}
                        onChange={(e) => {
                          onChangeValue && onChangeValue(index, e.target.value);
                        }}
                      />
                    )}

                    {file && (
                      <Button.Group basic size="mini">
                        <Button icon="eye" disabled={!isFile} />
                        <Button icon onClick={() => setFile(!isFile)}>
                          <Icon
                            name={isFile ? 'file' : 'file outline'}
                            style={{ color: isFile ? '#2CB5AD' : '#C1C1C1' }}
                          />
                        </Button>
                      </Button.Group>
                    )}
                  </div>
                </Table.Cell>
                <Table.Cell
                  textAlign={'center'}
                  className={clsx([styles.border, styles.hidLeft, styles.hidTop, styles.cell])}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button className={clsx([styles.btn, styles.table])} icon compact>
                      <Icon name="expand arrows alternate" />
                    </Button>
                    <Button
                      className={clsx([styles.btn, styles.table])}
                      icon
                      compact
                      onClick={() => onDeleteLine && onDeleteLine(item.index)}
                    >
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
