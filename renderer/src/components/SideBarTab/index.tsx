import React, { useRef } from 'react';
import styles from './index.module.scss';
import { TabProps } from '/@/model/sidebar.model';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const SideBarTab: React.FC<TabProps> = ({ icon, route = '', active = false }) => {
  const navigate = useNavigate();
  const tabRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    navigate(route);
  };
  return (
    <div ref={tabRef} onClick={handleClick} className={clsx([styles.tab, active && styles.active])}>
      <Icon className={styles.icon} disabled={!active} name={icon as any} />
    </div>
  );
};

export default SideBarTab;
