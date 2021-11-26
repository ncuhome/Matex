import React from 'react';
import styles from './index.module.scss';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import MockView from '../Mock';

const Home: React.FC<any> = () => {
  return (
    <div className={styles.rootCon}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.sideBar}>
        <SideBar />
      </div>
      <div className={styles.body}>
        <MockView />
      </div>
    </div>
  );
};

export default Home;
