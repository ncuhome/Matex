import React, {useId} from 'react';
import styles from './index.module.scss';
import { ChangeCellFunc, valueType } from '/@cmp/Table';

interface CheckboxProps {
  all?: boolean;
  selectAll?: () => void;
  rowIndex?: number;
  valueKey?: valueType;
  checked: boolean;
  onChange?: ChangeCellFunc;
}

const Checkbox: React.FC<CheckboxProps> = ({
  all = false,
  selectAll = () => {},
  rowIndex,
  valueKey,
  checked,
  onChange = () => {}
}) => {
  const id = useId();
  const handleClick = (e) => {
    e.stopPropagation();
    if (!all) {
      onChange(rowIndex!, valueKey!, !checked);
    } else {
      selectAll();
    }
  };

  return (
    <div className={styles.checkbox} onClick={handleClick}>
      <input type="checkbox" id={id} checked={checked} onChange={() => {}} />
      <label htmlFor={id} />
    </div>
  );
};

export default Checkbox;
