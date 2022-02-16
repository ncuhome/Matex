import React, { Fragment } from 'react';
import styles from './index.module.scss';
import Tab from '../SideBarTab';
import { sidebarModel } from '/@/model/sidebar.model';
import { useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();
  return (
    <div className={styles.sideBar}>
      {sidebarModel.map(({ route, text }, index) => {
        return (
          <Fragment key={text}>
            <Tab text={text} route={route} active={location.pathname.startsWith(route)} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default SideBar;
