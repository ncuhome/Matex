import React, { useEffect } from 'react';
import styles from './index.module.scss';
import SideBar from '../../components/SideBar';
import Mock from '../Mock';

const Home: React.FC<any> = () => {
  // useEffect(() => {
  //   (async () => {
  //     const startIpc = (await import('../../ipc/index')).default;
  //     setTimeout(() => {
  //       startIpc('hello Jack');
  //     }, 5000);
  //   })();
  // }, []);

  return (
    <div className={styles.rootCon}>
      <div className={styles.header} />
      <div className={styles.sideBar}>
        <SideBar />
      </div>
      <div className={styles.body}>
        <Mock />
      </div>
    </div>
  );
};

export default Home;
