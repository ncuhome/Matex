import React from 'react';
import styles from './index.module.scss';
import rainbow from '../../assets/icon/rainbow.svg';
import { useAtom } from 'jotai';
import { collapseAtom } from '../../store/commonStore';

const Header = () => {
  const [collapse, setCollapse] = useAtom(collapseAtom);
  const handleClick = () => {
    if (!collapse) {
      setCollapse(true);
    } else {
      setCollapse(false);
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
