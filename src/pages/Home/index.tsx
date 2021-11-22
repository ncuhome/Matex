import React, { useEffect } from 'react';
import styles from './index.module.scss';
import SideBar from '../../components/SideBar';
import Mock from '../MockView';
import Editor from '../../components/MonacoEditor';

const Home: React.FC<any> = () => {
  return (
    <div className={styles.rootCon}>
      <div className={styles.header} />
      <div className={styles.sideBar}>
        <SideBar />
      </div>
      <div className={styles.body}>
        <Editor />
      </div>
    </div>
  );
};

export default Home;
