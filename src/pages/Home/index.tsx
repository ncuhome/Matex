import React, { useEffect } from 'react';
import styles from './index.module.scss';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import { Outlet, useNavigate } from 'react-router-dom';

const Home: React.FC<any> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/mock', { replace: true });
  }, []);
  return (
    <div className={styles.rootCon}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.sideBar}>
        <SideBar />
      </div>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
