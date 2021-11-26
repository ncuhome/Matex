import React from 'react';
import styles from './index.module.scss';
import ApiCard from '../../../components/ApiCard';
import AddIcon from '@material-ui/icons/Add';

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
      <div className={styles.addCard}>
        <AddIcon sx={{ transform: 'scale(1.5)' }} />
      </div>
    </div>
  );
};

export default APIHeader;
