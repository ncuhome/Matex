import React from 'react';
import styles from './index.module.scss';
import { ApiList } from '/@cmp/ApiList';
import { Button, Icon, Label } from 'semantic-ui-react';

const CollectSide = () => {
  return (
    <div className={styles.side}>
      <div className={styles.list}>
        <div className={styles.header}>
          <Label tag color={'grey'} size={'tiny'}>
            请求历史<span style={{ color: 'white', display: 'inline-block', marginLeft: 10 }}>79</span>
          </Label>
        </div>
        <div className={styles.recordList}>
          <ApiList type={'get'} url={'http://localhost:3000/test'} />
          <ApiList type={'get'} url={'http://localhost:3000/test'} />
          <ApiList type={'post'} url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList type={'post'} url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
          <ApiList url={'http://localhost:3000/test'} />
        </div>
      </div>
      <div className={styles.ops}>
        <Button icon>
          <Icon name="save" />
        </Button>
        <Button icon>
          <Icon name="tag" />
        </Button>
        <Button icon>
          <Icon name="trash alternate" />
        </Button>
      </div>
    </div>
  );
};

export default CollectSide;
