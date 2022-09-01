import React from 'react';
import styles from './index.module.scss';
import { ChangeCellFunc, valueType } from '/@cmp/Table';

interface CheckboxProps {
  rowIndex?: number;
  valueKey?: valueType;
  checked: boolean;
  onClick?: () => void;
  onChange?: ChangeCellFunc;
}

const Checkbox: React.FC<CheckboxProps> = ({
  rowIndex,
  valueKey,
  checked,
  onChange = () => {},
  onClick = () => {}
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (rowIndex && valueKey) {
      onChange(rowIndex, valueKey, e.target.checked);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div className={styles.checkbox}>
      <input type="checkbox" id="inputId" checked={checked} onChange={handleChange} />
      <label onClick={handleClick} htmlFor="inputId"></label>
    </div>
  );
};

export default Checkbox;
