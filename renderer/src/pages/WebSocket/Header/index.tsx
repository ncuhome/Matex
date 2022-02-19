import React from 'react';
import styles from './index.module.scss';
import { Button, Label } from 'semantic-ui-react';

const Header = () => {
  return (
    <div className={styles.header}>
      <Label size={'small'} ribbon as="a" color={'orange'} style={{ marginLeft: 35, marginTop: -7 }}>
        路径
      </Label>
      <input className={styles.input} />
      <Button primary size={'large'} style={{ marginRight: 15 }}>
        连接
      </Button>
    </div>
  );
};

export default Header;
