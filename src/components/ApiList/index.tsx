import React from 'react';
import styles from './index.module.scss';
import Badge from '../MethodBadge';

interface ApiListProps {
  type?: 'get' | 'post';
  url?: string;
}

const ApiList: React.FC<ApiListProps> = ({ type = 'get', url = '' }) => {
  return (
    <div className={styles.apiList}>
      <Badge />
      <div className={styles.url}>
        <div className={styles.urlInfo}>
          <span className={styles.labelPort}>port</span>
          <span />
        </div>
        <div className={styles.urlInfo}>
          <span className={styles.labelPath}>path</span>
        </div>
      </div>
    </div>
  );
};

export default ApiList;
