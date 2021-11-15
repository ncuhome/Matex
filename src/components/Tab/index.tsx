import React from 'react';
import styles from './index.module.scss';
import { TabProps } from '../SideBar/tabItems';
import clsx from 'clsx';

const Tab: React.FC<TabProps> = ({ text = '', route = '', active }) => {
  console.log(route);
  return <div className={clsx([styles.tab, active && styles.active])}>{text}</div>;
};

export default Tab;
