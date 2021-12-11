import React, { Fragment } from 'react';
import styles from './index.module.scss';
import Tab from '../SideBarTab';
import { tabItems } from './tabItems';
import girl from '../../assets/icon/undraw_browsing_online_re_umsa.svg';
import { useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();
  return (
    <div className={styles.sideBar}>
      {tabItems.map(({ route, text }, index) => {
        return (
          <Fragment key={text}>
            <Tab text={text} route={route} active={location.pathname === route} />
          </Fragment>
        );
      })}
      <div className={styles.imgCon}>
        <img src={girl} className={styles.img} alt={''} />
      </div>
    </div>
  );
};

export default SideBar;
