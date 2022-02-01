import React from 'react';
import styles from './index.module.scss';
import { Icon, Label, Popup } from 'semantic-ui-react';

interface ApiListProps {
  type?: 'get' | 'post';
  url?: string;
}

export const ApiList: React.FC<ApiListProps> = ({ type = 'get', url = '/mac' }) => {
  const trigger = (
    <div className={styles.apiList}>
      <Label size={'small'} ribbon as="a" color={getColor(type)}>
        {type?.toUpperCase()}
      </Label>
      <div className={styles.url}>{url}</div>
    </div>
  );

  return <Popup trigger={trigger} content={url} position="left center" />;
};

const getColor = (type: string) => {
  return type === 'get' ? 'teal' : 'orange';
};

export const AddApiList = () => {
  return <div className={styles.apiList}>{/*<Plus />*/}</div>;
};
