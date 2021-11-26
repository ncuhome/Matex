import React from 'react';
import styles from './index.module.scss';
import MonacoEditor from '../../../components/MonacoEditor';
import star from '../../../assets/icon/star.svg';
const APIBody = () => {
  return (
    <div className={styles.body}>
      <div>
        <img src={star} className={styles.idleImg} />
        <h1 className={styles.title}>Mock Server</h1>
      </div>
      {/*<MonacoEditor defaultVal={''} language={'json'} />*/}
    </div>
  );
};

export default APIBody;
