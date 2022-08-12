import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { flexRender, Table } from '@tanstack/react-table';

export interface MyTableProps<T> {
  table: any;
}

const MyTable: React.FC<MyTableProps<any>> = ({ table }) => {
  return (
    <div className={styles.table}>
      {table.getHeaderGroups().map((headerGroup) => (
        <div className={clsx([styles.tableRow, styles.tableHeader])} key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <div className={styles.tableCol} key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
          ))}
        </div>
      ))}
      <div className={clsx([styles.tableBody])}>
        {table.getRowModel().rows.map((row) => (
          <div className={styles.tableRow} key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <div className={styles.tableCol} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTable;
