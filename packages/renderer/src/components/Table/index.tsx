import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { flexRender } from '@tanstack/react-table';
import CellInput from '/@cmp/Table/CellInput';
import AmplifyIcon from "/@cmp/svg/AmplifyIcon";
import DeleteIcon from "/@cmp/svg/DeleteIcon";

export interface MyTableProps<T> {
  table: any;
  onChangeCell: (rowIndex: number, colIndex: number, value: string) => void;
}

const MyTable: React.FC<MyTableProps<any>> = ({ table, onChangeCell }) => {

  const handleChange = (rowIndex, colIndex, value) => {
    onChangeCell(rowIndex, colIndex, value);
  };


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
        {table.getRowModel().rows.map((row, rowNumber) => (
          <div className={styles.tableRow} key={row.id}>
            {row.getVisibleCells().map((cell, colIndex) => (
              <div className={styles.tableCol} key={cell.id}>
                {colIndex === 2 ? (
                    <div className={styles.opt}>
                      <AmplifyIcon fill={'var(--light-text1)'} />
                      <div style={{ width: 40 }}></div>
                      <DeleteIcon fill={'var(--light-text1)'} transform={'scale(1.3)'}></DeleteIcon>
                    </div>
                ) : (
                  <CellInput
                    value={cell.getValue()}
                    onChange={handleChange}
                    colIndex={colIndex}
                    rowIndex={rowNumber}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTable;
