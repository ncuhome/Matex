import React from 'react';
import styles from './index.module.scss';
import { ChangeCellFunc, valueType } from '/@cmp/Table/index';

export interface CellInputProps {
  rowIndex: number;
  valueKey: valueType;
  value: string | number;
  onChange?: ChangeCellFunc;
}

const CellInput: React.FC<CellInputProps> = ({ rowIndex, valueKey, value, onChange = () => {} }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(rowIndex, valueKey, e.target.value);
  };

  return <input value={value} onChange={handleChange} className={styles.cellInput} />;
};

export default CellInput;
