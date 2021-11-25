import React, { useEffect } from 'react';
import styles from './index.module.scss';
import SideBar from '../../components/SideBar';
import rainbow from '../../assets/icon/rainbow.svg';
import Mock from '../MockView';
import Header from '../../components/Header';

const Home: React.FC<any> = () => {
  return (
    <div className={styles.rootCon}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.sideBar}>
        <SideBar />
      </div>
      <div className={styles.body}>{/*<Mock />*/}</div>
    </div>
  );
};

export default Home;
