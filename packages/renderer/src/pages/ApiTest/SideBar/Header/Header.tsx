import React from 'react';
import styles from './index.module.scss';
import { SidebarMenus } from '/@/Model/ApiTest.model';
import clsx from 'clsx';
import ProjectIcon from '/@cmp/svg/ProjectIcon';
import WiffIcon from '/@cmp/svg/WiffIcon';
import { useAtom } from 'jotai';
import { SidebarMenuTypeAtom } from '/@/store/ApiTest/sidebar.store';

const SidebarHeader = () => {
  const [sidebarMenuType, setSidebarMenuType] = useAtom(SidebarMenuTypeAtom);
  return (
      <div className={styles.header}>
        <div className={styles.title}>项目接口</div>
        <div className={styles.tabs}>
          {SidebarMenus.map((item) => {
            return (
                <div
                    key={item}
                    onClick={() => setSidebarMenuType(item)}
                    className={clsx([styles.tab, sidebarMenuType === item && styles.active])}
                >
                  {item === '项目接口' ? <ProjectIcon /> : <WiffIcon />}
                </div>
            );
          })}
          <div
              className={styles.overlayBox}
              style={{ transform: `translateX(${sidebarMenuType === '项目接口' ? 18 : 87}px)` }}
          ></div>
        </div>
      </div>
  );
};

export default SidebarHeader;
