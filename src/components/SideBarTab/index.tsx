import React from 'react';
import styles from './index.module.scss';
import { TabProps } from '../SideBar/tabItems';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const SideBarTab: React.FC<TabProps> = ({ text = '', route = '', active = false, renderIcon }) => {
  const navigate = useNavigate();
  const [hover, setHover] = React.useState(false);

  const handleClick = () => {
    navigate(route);
  };
  return (
    <div
      onClick={handleClick}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
      className={clsx([styles.tab, active && styles.active])}
    >
      <div>{renderIcon({ active: hover || active })}</div>
      {text}
    </div>
  );
};

export default SideBarTab;
