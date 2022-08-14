import React from 'react';
import styles from './app.module.scss'
import AuthRouter from "/@/router";

function App() {

  return (
    <div className={styles.app}>
      <AuthRouter/>
    </div>
  );
}

export default App;
