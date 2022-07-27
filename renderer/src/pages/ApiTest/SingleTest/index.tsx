import React from 'react';
import styles from './index.module.scss';
import CollectSide from './Side';
import Header from './Header';
import Body from './Body';

const SingleTest = () => {
  return (
    <div className={styles.collection}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <Body />
      </div>
      <div className={styles.side}>
        <CollectSide />
      </div>
    </div>
  );
};

export default SingleTest;
