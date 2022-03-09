import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import { useAtom } from 'jotai';
import {collapseAtom, fullscreenAtom} from '/@/store/commonStore';
import {useAtomValue} from 'jotai/utils';

const Home: React.FC<any> = () => {
  const navigate = useNavigate();
  const [collapse] = useAtom(collapseAtom);
  const isFullscreen = useAtomValue(fullscreenAtom);

  useEffect(() => {
    navigate('/apiTest', { replace: true });
  }, []);
  return (
    <div className={styles.rootCon} style={{marginLeft:isFullscreen?0:41}}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.con}>
        <div className={styles.sideBar} style={{ width: collapse ? '70px' : '220px',marginLeft:isFullscreen?0:-40 }}>
          <SideBar />
        </div>
        <div className={styles.body}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
