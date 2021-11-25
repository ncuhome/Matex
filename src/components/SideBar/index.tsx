import React, { Fragment } from 'react';
import styles from './index.module.scss';
import Tab from '../SideBarTab';
import { tabItems } from './tabItems';
import girl from '../../assets/icon/undraw_browsing_online_re_umsa.svg';

const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      {tabItems.map(({ route, text }, index) => {
        return (
          <Fragment key={text}>
            <Tab text={text} route={route} active={index === 2} />
          </Fragment>
        );
      })}
      <div className={styles.imgCon}>
        <img src={girl} className={styles.img} />
      </div>
    </div>
  );
};

export default SideBar;
