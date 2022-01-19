import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { TabProps } from '../SideBar/tabItems';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useCollapse } from '../../zustand/store/ui.store';
import { Icon } from 'semantic-ui-react';

const SideBarTab: React.FC<TabProps> = ({ text = '', route = '', active = false }) => {
  const navigate = useNavigate();
  const tabRef = useRef<HTMLDivElement>(null);
  const { collapse } = useCollapse((state) => state);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    navigate(route);
  };
  useEffect(() => {
    if (!collapse) {
      setTimeout(() => {
        setShow(true);
      }, 200);
    } else {
      setShow(false);
    }
  }, [collapse]);
  return (
    <div
      ref={tabRef}
      onClick={handleClick}
      style={{ width: collapse ? '50px' : '130px' }}
      className={clsx([styles.tab, active && styles.active])}
    >
      <div className={clsx([styles.tabIcon])}>{getIcon(route)}</div>
      <div style={{ display: show ? 'block' : 'none' }} className={clsx([styles.text])}>
        {text}
      </div>
    </div>
  );
};

const getIcon = (route: string) => {
  let res;
  switch (route) {
    case '/collect':
      res = <Icon disabled name="world" />;
      break;
    case '/mock':
      res = <Icon disabled name="cubes" />;
      break;
    case '/benchmark':
      res = <Icon disabled name="linkify" />;
      break;
    case '/ok':
      res = <Icon disabled name="find" />;
      break;
  }
  return res;
};

export default SideBarTab;
