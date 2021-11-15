import React, { Fragment } from 'react';
import styles from './index.module.scss';
import Tab from '../Tab';
import { tabItems } from './tabItems';

const SideBar = () => {
  return (
    <div className={styles.sideBar}>
      {tabItems.map(({ route, text }) => {
        return (
          <Fragment key={text}>
            <Tab text={text} route={route} />
          </Fragment>
        );
      })}
    </div>
  );
};

export default SideBar;
