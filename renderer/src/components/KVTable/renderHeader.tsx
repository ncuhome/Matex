import React from 'react';
import { Table } from 'semantic-ui-react';
import clsx from 'clsx';
import styles from './index.module.scss';

const renderHeader = () => {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={3} className={clsx([styles.border, styles.borderRight, styles.cell])}>
          键
        </Table.HeaderCell>
        <Table.HeaderCell className={clsx([styles.border, styles.hidLeft, styles.cell])}>值</Table.HeaderCell>
        <Table.HeaderCell
          width={3}
          textAlign={'center'}
          className={clsx([styles.border, styles.hidLeft, styles.cell])}
        >
          操作
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
};

export default renderHeader;
