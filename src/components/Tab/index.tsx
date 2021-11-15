import React from 'react';
import styles from './index.module.scss';
import { TabProps } from '../SideBar/tabItems';

const Tab: React.FC<TabProps> = ({ text = '', route = '' }) => {
  console.log(route);
  return <div className={styles.tab}>{text}</div>;
};

export default Tab;
