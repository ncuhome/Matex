import React, { Fragment, useEffect } from 'react';
import { initSelect } from './initSelect';
// import './index.scss';

export interface DropDownProps {
  id: string;
  menus: string[];
  defaultValue?: string;
  onSelect?: (index: number, value: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  menus,
  id,
  defaultValue,
  onSelect = () => {
    return;
  }
}) => {
  const selectRef = React.useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectRef.current) {
      initSelect(selectRef.current, { menus, onSelect, id });
    }
  }, [selectRef.current]);

  return (
    <select ref={selectRef} defaultValue={defaultValue}>
      {menus.map((item) => {
        return (
          <Fragment key={item}>
            <option value={item}>{item}</option>
          </Fragment>
        );
      })}
    </select>
  );
};

export default DropDown;
