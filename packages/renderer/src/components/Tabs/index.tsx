import React, { Fragment } from 'react';
import styles from './index.module.scss';

interface TabsProps {
  menus: string[];
  selectedKey: string;
  onSelect?: (index, sel) => void;
}

const Tabs: React.FC<TabsProps> = ({ menus, selectedKey, onSelect = () => {} }) => {
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
              htmlFor={'tab-' + (index + 1)}
              className={styles['label__' + (index + 1)]}
              onClick={() => onSelect(index, menu)}
            >
              <p>{menu}</p>
            </label>
          </Fragment>
        );
      })}
      <div className={styles.overlay__color} style={{transform:`translateX(${_count*6}rem)`}}></div>
    </div>
  );
};

export default Tabs;
