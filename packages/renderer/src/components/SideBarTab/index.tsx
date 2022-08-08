import React, { useRef } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import SideBarIcon, {IconProps} from "/@cmp/SideBarTab/SideBarIcon";

export interface TabProps {
  icon:IconProps['name']
  route:string
  active:boolean
}

const getColor = (active:boolean)=>active? 'var(--light-text1)':'var(--light-text2)'

const SideBarTab: React.FC<TabProps> = ({ icon, route = '', active = false }) => {
  const navigate = useNavigate();
  const tabRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    navigate(route);
  };
  return (
    <div ref={tabRef} onClick={handleClick} className={clsx([styles.tab, active && styles.active])}>
      <SideBarIcon name={icon} color={getColor(active)}/>
    </div>
  );
};

export default SideBarTab;
