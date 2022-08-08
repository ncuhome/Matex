import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from "/@/pages/Home/SiderBar";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = !!localStorage.getItem('login');
    if (auth) {
      navigate('/api');
    } else {
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.header}></div>
      <div className={styles.sidebar}>
        <SideBar/>
      </div>
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
