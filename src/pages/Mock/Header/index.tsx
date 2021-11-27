import React from 'react';
import styles from './index.module.scss';
import { AddApiCard, ApiCard } from '../../../components/ApiCard';

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
      <AddApiCard />
    </div>
  );
};

export default APIHeader;
