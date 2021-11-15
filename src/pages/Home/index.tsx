import React from 'react';
import styles from './index.module.scss';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';

const Home: React.FC<any> = () => {
  return (
    <div className={styles.rootCon}>
      <div className={styles.header} />
      <div className={styles.sideBar} />
      <div className={styles.body} />
      {/*<Header />*/}
      {/*<SideBar />*/}
      {/*<div />*/}
    </div>
  );
};

export default Home;
