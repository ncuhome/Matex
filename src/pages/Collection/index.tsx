import React from 'react';
import styles from './index.module.scss';
import MonacoEditor from '../../components/MonacoEditor';
import CollectSide from './Side';
import Header from './Header';

const Collection = () => {
  return (
    <div className={styles.collection}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <div className={styles.editor}>
          <MonacoEditor name={'collect'} language={'json'} defaultVal={''} height={250} width={'100%'} />
        </div>
      </div>
      <div className={styles.side}>
        <CollectSide />
      </div>
    </div>
  );
};

export default Collection;
