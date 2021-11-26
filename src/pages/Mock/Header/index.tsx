import React, { Fragment, useMemo } from 'react';
import styles from './index.module.scss';
import ApiCard from '../../../components/ApiCard';

const APIHeader = () => {
  return (
    <div className={styles.apiArea}>
      <ApiCard />
      <ApiCard />
      <ApiCard />
      <ApiCard />
      <ApiCard />
      <ApiCard />
      <ApiCard />
      <ApiCard />
      <ApiCard />
    </div>
  );
};

export default APIHeader;
