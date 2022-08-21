import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { flexRender } from '@tanstack/react-table';
import CellInput from '/@cmp/Table/CellInput';
import EyesIcon from '/@cmp/svg/EyesIcon';
import DeleteIcon from '/@cmp/svg/DeleteIcon';
import type { ConfigType } from '/@/Model/ApiTest.model';
import FileInput from '/@cmp/Table/FileInput';

export interface MyTableProps<T> {
  type: ConfigType;
  file?: boolean;
  table: any;
  onChangeCell: (rowIndex: number, colIndex: number, value: string) => void;
  onLeftAction?: (e) => void;
  onRightAction?: (e, index) => void;
}

const KVTable: React.FC<MyTableProps<any>> = ({
  type,
  file = false,
  table,
  onChangeCell,
  onRightAction = () => {},
  onLeftAction = () => {}
}) => {
  const handleChange = (rowIndex, colIndex, value) => {
    onChangeCell(rowIndex, colIndex, value);
  };

  const isBody = type === 'body';

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
                    <EyesIcon
                      onClick={(e) => onLeftAction(e)}
                      fill={!isBody ? 'var(--dark-color2)' : 'var(--light-text1)'}
                      className={clsx(['svgIcon', isBody && 'hover'])}
                    />
                    <div style={{ width: 40 }}></div>
                    <DeleteIcon
                      onClick={(e) => onRightAction(e, rowNumber)}
                      className={clsx(['svgIcon', 'hover'])}
                      fill={'var(--light-text1)'}
                      transform={'scale(1.1)'}
                    ></DeleteIcon>
                  </div>
                ) : file&&colIndex===1? (
                  <FileInput
                    colIndex={colIndex}
                    rowIndex={rowNumber}
                    value={cell.getValue()}
                    onChange={handleChange}
                  />
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

export default KVTable;
