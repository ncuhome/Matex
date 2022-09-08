import React, { useEffect } from 'react';
import styles from './index.module.scss';
import ArrowDownIcon from '/@cmp/svg/ArrowDownIcon';
import { creatDropDown, hidden } from './util';

export interface DropDownProps {
  textTransform?: 'capitalize' | 'uppercase'|'lowercase'|'none';
  menus: any[];
  btnText?: string;
  fontSize?: number;
  large?: boolean;
  selectedKey?: string;
  onSelectionChange?: (index: number, key: string) => void;
  width?: number;
}

type HandleHidden = (e) => void;

const MyDropDown: React.FC<DropDownProps> = ({
  textTransform = 'capitalize',
  width,
  btnText,
  fontSize = 14,
  large = false,
  menus,
  selectedKey,
  onSelectionChange = () => {}
}) => {
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
    dropRef.current = creatDropDown({ event: e, large, menus, selectedKey, onSelectionChange });
    showRef.current = true;
  };

  return (
    <div className={styles.dropDown} style={{ width }} onClick={handleClick}>
      <div className={styles.btn} style={{ fontSize,textTransform }}>
        {btnText ?? selectedKey}
      </div>
      <div className={styles.trigger}>
        <ArrowDownIcon className={styles.icon} fill={'var(--light-text1)'} />
      </div>
    </div>
  );
};

export default MyDropDown;
