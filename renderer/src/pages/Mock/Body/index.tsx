import React from 'react';
import styles from './index.module.scss';
import MockForm from './MockForm';

const APIBody = () => {
  return (
    <div className={styles.body}>
      <MockForm />
    </div>
  );
};

export default APIBody;
