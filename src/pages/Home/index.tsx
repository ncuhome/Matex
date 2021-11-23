import React, { useEffect } from 'react';
import styles from './index.module.scss';
import SideBar from '../../components/SideBar';
import Mock from '../MockView';
import { useRive } from 'rive-react';

const Home: React.FC<any> = () => {
  const params = {
    src: './public/runner_boy.riv',
    autoplay: true
  };
  const { RiveComponent, rive } = useRive(params);
  return (
    <div className={styles.rootCon}>
      <div className={styles.header} />
      <div className={styles.sideBar}>
        <SideBar />
      </div>
      <div className={styles.body}>
        {/*<Mock />*/}
        <RiveComponent />
      </div>
    </div>
  );
};

export default Home;
