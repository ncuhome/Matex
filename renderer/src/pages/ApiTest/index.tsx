import React, { useEffect } from 'react';
import styles from './index.module.scss';
import CollectSide from './Side';
import Header from './Header';
import Body from './Body';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { preRouteAtom } from '/@/store/commonStore';
import { useUpdateAtom } from 'jotai/utils';
import { apiTestFormDataAtom } from '/@/store/apiTestStore';

const Collection = () => {
  const [preRoute, setPreRoute] = useAtom(preRouteAtom);
  const location = useLocation();
  const navigate = useNavigate();
  const updateFormData = useUpdateAtom(apiTestFormDataAtom);

  useEffect(() => {
    if (location.pathname === '/apiTest') {
      if (preRoute) {
        navigate(preRoute);
      } else {
        navigate('/apiTest/params');
      }
    }
    return () => {
      updateFormData([]);
      if (location.pathname !== '/apiTest') {
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
