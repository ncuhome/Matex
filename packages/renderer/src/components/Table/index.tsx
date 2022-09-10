import React, { useCallback } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import CellInput from '/@cmp/Table/CellInput';
import EyesIcon from '/@cmp/svg/EyesIcon';
import DeleteIcon from '/@cmp/svg/DeleteIcon';
import type { ConfigType } from '/@/Model/ApiTest.model';
import FileInput from '/@cmp/Table/FileInput';
import Checkbox from './CheckBox';
import { KVConfig } from '/@/Model/ApiTest.model';
import { isAllChecked } from '/@cmp/Table/utils';

export type valueType = Exclude<keyof KVConfig, 'id' | 'opt'>;
export type ChangeCellFunc = (rowIndex: number, type: valueType, value: string | File | boolean) => void;

export interface MyTableProps<T> {
  type: ConfigType;
  file?: boolean;
  data: KVConfig[];
  onChangeCell: ChangeCellFunc;
  onLeftAction?: (e) => void;
  onRightAction?: (e, index) => void;
}

const KVTable: React.FC<MyTableProps<any>> = ({
  type,
  file = false,
  data,
  onChangeCell,
  onRightAction = () => {},
  onLeftAction = () => {}
}) => {
  const handleChange = (rowIndex, type: valueType, value) => {
    onChangeCell(rowIndex, type, value);
  };

  const isBody = type === 'body';

  const renderCol = (rowIndex, colIndex: number, key: string, colData: KVConfig) => {
    let _Ele: React.ReactNode = null;
    switch (key as keyof KVConfig) {
      case 'selected':
        _Ele = (
          <Checkbox
            valueKey={key as valueType}
            rowIndex={rowIndex}
            checked={colData.selected}
            onChange={handleChange}
          />
        );
        break;
      case 'key':
        _Ele = (
          <CellInput
            value={colData.key}
            onChange={handleChange}
            valueKey={key as valueType}
            rowIndex={rowIndex}
          />
        );
        break;
      case 'value':
        if (file && colIndex === 2) {
          _Ele = (
            <FileInput
              valueKey={key as valueType}
              rowIndex={rowIndex}
              value={colData.value}
              onChange={handleChange}
            />
          );
        } else {
          _Ele = (
            <CellInput
              value={colData.value as string}
              onChange={handleChange}
              valueKey={key as valueType}
              rowIndex={rowIndex}
            />
          );
        }
        break;
      case 'opt':
        _Ele = (
          <div className={styles.opt}>
            <EyesIcon
              onClick={(e) => onLeftAction(e)}
              fill={!isBody ? 'var(--dark-color2)' : 'var(--light-text1)'}
              className={clsx(['svgIcon', isBody && 'hover'])}
            />
            <div style={{ width: 40 }}></div>
            <DeleteIcon
              onClick={(e) => onRightAction(e, rowIndex)}
              className={clsx(['svgIcon', 'hover'])}
              fill={'var(--light-text1)'}
              transform={'scale(1.1)'}
            ></DeleteIcon>
          </div>
        );
        break;
    }
    return _Ele;
  };

  const handleHeaderCheckbox = () => {
    if (isAllChecked(data)) {
      data.forEach((row, rowIndex) => {
        onChangeCell(rowIndex, 'selected', false);
      });
    } else {
      data.forEach((row, rowIndex) => {
        onChangeCell(rowIndex, 'selected', true);
      });
    }
  };

  return (
    <div className={styles.table}>
      <div className={clsx([styles.tableRow, styles.tableHeader])}>
        <div className={clsx([styles.tableCol, styles.checkbox])}>
          <Checkbox all checked={isAllChecked(data)} selectAll={handleHeaderCheckbox} />
        </div>
        <div className={styles.tableCol}>键</div>
        <div className={styles.tableCol}>值</div>
        <div className={styles.tableCol}>操作</div>
      </div>
      <div className={clsx([styles.tableBody])}>
        {data.map((item, rowNumber) => {
          return (
            <div className={clsx([styles.tableRow])} key={rowNumber}>
              {Object.keys(item).map((key, colIndex) => {
                if (key === ('id' as keyof KVConfig)) {
                  return null;
                }
                return (
                  <div key={key} className={clsx([styles.tableCol, key === 'selected' && styles.checkbox])}>
                    {renderCol(rowNumber, colIndex, key, item)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KVTable;
