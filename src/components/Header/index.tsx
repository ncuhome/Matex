import React from 'react';
import styles from './index.module.scss';
import rainbow from '../../assets/icon/rainbow.svg';
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logoCon}>
        <img src={rainbow} className={styles.logo} />
      </div>
      <h2 className={styles.title}>Mock Server</h2>
    </div>
  );
};

export default Header;
