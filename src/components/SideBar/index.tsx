import React, { Fragment } from 'react';
import styles from './index.module.scss';
import Tab from '../Tab';
import { tabItems } from './tabItems';

const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      <div />
      {tabItems.map(({ route, text }, index) => {
        return (
          <Fragment key={text}>
            <Tab text={text} route={route} active={index === 2} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default SideBar;
