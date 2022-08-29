import React, {CSSProperties, Fragment} from 'react';
import styles from './index.module.scss';

interface TabsProps {
  width?: number;
  style?:CSSProperties | undefined
  menus: string[];
  selectedKey: string;
  onSelect?: (index, sel) => void;
}

const Tabs: React.FC<TabsProps> = ({ style,width = 5.85, menus, selectedKey, onSelect = () => {} }) => {
  const _count = menus.findIndex((item) => {
    return item === selectedKey;
  });

  return (
    <div className={styles.tabCon} style={style}>
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
              style={{ width: `${width}rem` }}
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
        style={{ transform: `translateX(${_count * width}rem)`, width: (width-0.6) + 'rem' }}
      ></div>
    </div>
  );
};

export default Tabs;
