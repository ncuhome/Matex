import React from 'react';
import styles from './index.module.scss';
import rainbow from '../../assets/icon/rainbow.svg';
import { useCollapse } from '../../zustand/store/ui.store';

const Header = () => {
  const { collapse, openCollapse, closeCollapse } = useCollapse((state) => state);

  const handleClick = () => {
    console.log('click');
    if (!collapse) {
      openCollapse();
    } else {
      closeCollapse();
    }
  };
  return (
    <div className={styles.header}>
      <div
        className={styles.logoCon}
        style={{ marginLeft: collapse ? '-16px' : '35px' }}
        onClick={handleClick}
      >
        <img src={rainbow} className={styles.logo} alt={''} />
      </div>
      <h2 className={styles.title}>Mock Server</h2>
    </div>
  );
};

export default Header;
