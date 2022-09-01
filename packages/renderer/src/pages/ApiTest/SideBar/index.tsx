import React from 'react';
import styles from './index.module.scss';
import SidebarHeader from '/@/pages/ApiTest/SideBar/Header/Header';
import ProjectList from '/@/pages/ApiTest/SideBar/ProjectList';
import { useAtomValue } from 'jotai';
import { SidebarMenuTypeAtom } from '/@/store/ApiTest/sidebar.store';
import SpeedTest from '/@/pages/ApiTest/SideBar/SpeedTest';

const ApiTestSideBar = () => {
  const sidebarMenuType = useAtomValue(SidebarMenuTypeAtom);

  return (
    <div className={styles.sidebar}>
      <SidebarHeader />
      <div className={styles.body}>{sidebarMenuType === '项目接口' ? <ProjectList /> : <SpeedTest />}</div>
    <div className={styles.footer}>

    </div>
    </div>
  );
};

export default ApiTestSideBar;
