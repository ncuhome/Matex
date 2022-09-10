import React from 'react';
import styles from './index.module.scss';
import Header from './Header';
import ConfigSide from '/@/pages/ApiTest/Config/Side';
import ConfigTable from "/@/pages/ApiTest/Config/ConfigDataTable";

const Config = () => {
  return (
    <div className={styles.config}>
      <Header />
      <ConfigSide />
      <ConfigTable />
    </div>
  );
};

export default Config;
