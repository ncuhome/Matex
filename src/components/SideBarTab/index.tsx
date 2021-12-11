import React from 'react';
import styles from './index.module.scss';
import { TabProps } from '../SideBar/tabItems';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const SideBarTab: React.FC<TabProps> = ({ text = '', route = '', active }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };
  return (
    <div onClick={handleClick} className={clsx([styles.tab, active && styles.active])}>
      {text}
    </div>
  );
};

export default SideBarTab;
