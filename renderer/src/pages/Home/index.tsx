import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import { useAtom } from 'jotai';
import { collapseAtom } from '/@/store/commonStore';

const Home: React.FC<any> = () => {
  const navigate = useNavigate();
  const [collapse] = useAtom(collapseAtom);

  useEffect(() => {
    navigate('/apiTest', { replace: true });
  }, []);
  return (
    <div className={styles.rootCon}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.con}>
        <div className={styles.sideBar} style={{ width: collapse ? '70px' : '190px' }}>
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
