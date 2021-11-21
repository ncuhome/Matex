import React from 'react';
import styles from './index.module.scss';
import { useApiDataStore } from '../../zustand/store/apiData.store';

interface TableInputProps {
  index: number;
  defaultValue: any;
  keyType: 'route' | 'type' | 'resData' | 'desc';
}

const TableInput: React.FC<TableInputProps> = ({ index, keyType, defaultValue }) => {
  const { setApi } = useApiDataStore((state) => state);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setApi(index, keyType, value);
  };

  return <input defaultValue={defaultValue} className={styles.input} onBlur={handleBlur} />;
};

export default TableInput;
