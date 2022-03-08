import React from 'react';
import styles from './index.module.scss';
import TrafficLights from '/@cmp/TrafficLights';
import {MatexWin} from '/@/global';

const Header = () => {
  return (
    <div className={styles.header}>
      {
        MatexWin.OS==='win'&&<TrafficLights/>
      }
    </div>
  );
};

export default Header;
