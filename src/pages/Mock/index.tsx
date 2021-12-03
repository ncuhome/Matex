import React from "react";
import styles from "./index.module.scss";
import APIHeader from "./Header";
import APISider from "./Side";
import APIBody from "./Body";
import MockIdle from "./Body/MockIdle";

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
        <div className={styles.idle}>
          <MockIdle />
        </div>
        <div className={styles.content}>
          <APIBody />
        </div>
      </div>
    </div>
  );
};

export default MockView;
