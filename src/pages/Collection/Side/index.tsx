import React from 'react';
import styles from './index.module.scss';
import { ApiList } from '../../../components/ApiList';
import { Button, Tag } from '@geist-ui/react';
import { Plus, Power, Save } from '@geist-ui/react-icons';

const CollectSide = () => {
  return (
    <div className={styles.side}>
      <div className={styles.list}>
        <div className={styles.header}>
          <h4>请求历史</h4>
          <Tag type="lite">32</Tag>
        </div>
        <div className={styles.recordList}>
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
        </div>
      </div>
      <div className={styles.ops}>
        <Button iconRight={<Plus />} type="secondary" shadow auto scale={1} px={0.6} />
        <Button iconRight={<Save />} type="secondary" shadow auto scale={1} px={0.6} />
        <Button iconRight={<Power />} type="secondary" shadow auto scale={1} px={0.6} />
      </div>
    </div>
  );
};

export default CollectSide;
