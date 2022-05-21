import React from 'react';
import styles from './index.module.scss';
import { useLocation } from 'react-router-dom';
import { getRoutes } from '/@cmp/Header/matchRoute';
import { Icon } from 'semantic-ui-react';
import clsx from 'clsx';

const UnderLineRoute = () => {
  const location = useLocation();

  const routeList = getRoutes(location.pathname);

  return (
    <div className={styles.routerList}>
      {routeList.map(({ icon, text, route }, index) => {
        const active = location.pathname.includes(route);
        return (
          <div key={index} className={clsx([styles.underLineRoute, active && styles.active])}>
            <div className={styles.title}>
              <div>
                <Icon name={icon as any} className={styles.icon} />
              </div>
              <div className={styles.text}>{text}</div>
            </div>
            <div className={clsx([styles.underline, active && styles.showUnderline])} />
          </div>
        );
      })}
    </div>
  );
};

export default UnderLineRoute;
