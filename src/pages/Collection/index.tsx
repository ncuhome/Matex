import React, { useEffect } from 'react';
import styles from './index.module.scss';
import CollectSide from './Side';
import Header from './Header';
import Body from './Body';
import { usePreRoute } from '../../zustand/store/ui.store';
import { useLocation } from 'react-router-dom';

const Collection = () => {
  const { setPreRoute } = usePreRoute((state) => state);
  const location = useLocation();

  useEffect(() => {
    return () => {
      if (location.pathname !== '/collect') {
        setPreRoute(location.pathname);
      }
    };
  }, [location.pathname]);

  return (
    <div className={styles.collection}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <Body />
      </div>
      <div className={styles.side}>
        <CollectSide />
      </div>
    </div>
  );
};

export default Collection;
