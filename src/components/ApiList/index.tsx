import React from 'react';
import styles from './index.module.scss';
import { Label } from 'semantic-ui-react';

interface ApiListProps {
  type?: 'get' | 'post';
  url?: string;
}

export const ApiList: React.FC<ApiListProps> = ({ type = 'get', url = '/mac' }) => {
  return (
    <div className={styles.apiList}>
      <Label ribbon as="a" color={getColor(type)}>
        First
      </Label>
      <div className={styles.url}>{url}</div>
    </div>
  );
};

const getColor = (type: string) => {
  return type === 'get' ? 'teal' : 'orange';
};

export const AddApiList = () => {
  return <div className={styles.apiList}>{/*<Plus />*/}</div>;
};
