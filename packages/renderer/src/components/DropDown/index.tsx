import React, { useEffect } from 'react';
import styles from './index.module.scss';
import ArrowDownIcon from '/@cmp/svg/ArrowDownIcon';
import { creatDropDown, hidden } from './util';

export interface DropDownProps {
  menus: any[];
  selectedKey?: string;
  onSelectionChange?: (index: number, key: string) => void;
  width?: number;
}

type HandleHidden = (e) => void;

const MyDropDown: React.FC<DropDownProps> = ({ width, menus, selectedKey, onSelectionChange = () => {} }) => {
  const showRef = React.useRef(false);
  const dropRef = React.useRef<HTMLDivElement | null>(null);
  const listenerRef = React.useRef<HandleHidden | null>(null);

  useEffect(() => {
    const handle = (e) => {
      dropRef.current && hidden(e, dropRef.current);
    };
    document.addEventListener('click', handle);
    return () => {
      listenerRef.current && document.removeEventListener('click', handle);
    };
  }, []);

  const handleClick = (e: any) => {
    e.stopPropagation();
    dropRef.current = creatDropDown({ event: e, menus, selectedKey, onSelectionChange });
    showRef.current = true;
  };

  return (
    <div className={styles.dropDown} style={{ width }} onClick={handleClick}>
      <div className={styles.btn}>{selectedKey}</div>
      <div className={styles.trigger}>
        <ArrowDownIcon className={styles.icon} fill={'var(--light-text1)'} />
      </div>
    </div>
  );
};

export default MyDropDown;
