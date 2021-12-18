import React from 'react';
import styles from './index.module.scss';
import Plus from '@geist-ui/react-icons/plus';
import { Tag } from '@geist-ui/react';

interface ApiListProps {
  type?: 'get' | 'post';
  url?: string;
}

export const ApiList: React.FC<ApiListProps> = ({ type = 'get', url = '/mac' }) => {
  return (
    <div className={styles.apiList}>
      <Tag type="secondary" scale={3 / 4}>
        Get
      </Tag>
      <div className={styles.url}>{url}</div>
    </div>
  );
};

export const AddApiList = () => {
  return (
    <div className={styles.apiList}>
      <Plus />
    </div>
  );
};
