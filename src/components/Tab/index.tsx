import React from 'react';
import styles from './index.module.scss';
import { TabProps } from '../SideBar/tabItems';
import clsx from 'clsx';

const SideBarTab: React.FC<TabProps> = ({ text = '', route = '', active }) => {
  return <div className={clsx([styles.tab, active && styles.active])}>{text}</div>;
};

export default SideBarTab;
