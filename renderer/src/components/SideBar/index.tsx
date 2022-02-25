import React, { Fragment } from 'react';
import styles from './index.module.scss';
import Tab from '../SideBarTab';
import { sidebarModel } from '/@/model/sidebar.model';
import { useLocation } from 'react-router-dom';
import logo from '/@/assets/image/logo.png';
import { useAtom } from 'jotai';
import { collapseAtom } from '/@/store/commonStore';

const SideBar = () => {
  const location = useLocation();
  const [collapse, setCollapse] = useAtom(collapseAtom);
  const handleClick = () => {
    if (!collapse) {
      setCollapse(true);
    } else {
      setCollapse(false);
    }
  };

  return (
    <>
      <div className={styles.sideBar}>
        <div className={styles.title}>
          <img src={logo} className={styles.logo} alt={'logo'} />
          {!collapse && <h3 className={styles.titleText}>Matex</h3>}
        </div>
        {sidebarModel.map(({ route, text }) => {
          return (
            <Fragment key={text}>
              <Tab text={text} route={route} active={location.pathname.startsWith(route)} />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default SideBar;
