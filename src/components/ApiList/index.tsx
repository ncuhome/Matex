import React from 'react';
import styles from './index.module.scss';
import Badge from '../MethodBadge';
import AddIcon from '@mui/icons-material/Add';

interface ApiListProps {
  type?: 'get' | 'post';
  url?: string;
}

export const ApiList: React.FC<ApiListProps> = ({ type = 'get', url = '' }) => {
  return (
    <div className={styles.apiList}>
      <Badge />
      <div className={styles.url}>http:localhost:8080/mac11111</div>
    </div>
  );
};

export const AddApiList = () => {
  return (
    <div className={styles.apiList}>
      <AddIcon sx={{ transform: 'scale(1.5)' }} />
    </div>
  );
};
