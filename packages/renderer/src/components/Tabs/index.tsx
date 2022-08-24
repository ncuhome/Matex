import React, { Fragment } from 'react';
import styles from './index.module.scss';

interface TabsProps {
  width?: number;
  menus: string[];
  selectedKey: string;
  onSelect?: (index, sel) => void;
}

const Tabs: React.FC<TabsProps> = ({ width = 5.85, menus, selectedKey, onSelect = () => {} }) => {
  const _count = menus.findIndex((item) => {
    return item === selectedKey;
  });

  return (
    <div className={styles.tabCon}>
      {menus.map((menu, index) => {
        return (
          <Fragment key={menu}>
            <input
              type="radio"
              onChange={() => {}}
              id={'tab-' + (index + 1)}
              value={menu}
              className={styles['tab' + (index + 1)]}
              checked={selectedKey === menu}
            />
            <label
              style={{ width: `${width+0.3}rem` }}
              htmlFor={'tab-' + (index + 1)}
              className={styles.label}
              onClick={() => onSelect(index, menu)}
            >
              <p>{menu}</p>
            </label>
          </Fragment>
        );
      })}
      <div
        className={styles.overlay__color}
        style={{ transform: `translateX(${_count * (width+0.2)}rem)`, width: width + 'rem' }}
      ></div>
    </div>
  );
};

export default Tabs;
