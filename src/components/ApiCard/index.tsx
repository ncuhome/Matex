import React from 'react';
import styles from './index.module.scss';
import Badge from '../MethodBadge';

const ApiCard = () => {
  return (
    <div className={styles.apiCard}>
      <Badge />
    </div>
  );
};

export default ApiCard;
