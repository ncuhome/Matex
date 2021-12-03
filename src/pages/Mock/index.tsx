import React from "react";
import styles from "./index.module.scss";
import APIHeader from './Header';
import APISider from './Side';
import APIBody from './Body';

const MockView = () => {
  return (
    <div className={styles.con}>
      <div className={styles.header}>
        <APIHeader />
      </div>
      <div className={styles.side}>
        <APISider />
      </div>
      <div className={styles.body}>
        <APIBody />
      </div>
    </div>
  );
};

export default MockView;
