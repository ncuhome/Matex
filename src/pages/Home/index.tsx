import React, { useEffect } from 'react';
import styles from './index.module.scss';
import Header from '../../components/Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useCollapse } from '../../zustand/store/ui.store';
import SideBar from '../../components/SideBar';

const Home: React.FC<any> = () => {
  const navigate = useNavigate();
  const { collapse } = useCollapse((state) => state);

  useEffect(() => {
    navigate('/mock', { replace: true });
  }, []);
  return (
    <div className={styles.rootCon}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.con}>
        <div className={styles.sideBar} style={{ width: collapse ? '70px' : '150px' }}>
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
