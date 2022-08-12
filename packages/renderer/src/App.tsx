import React, {useEffect} from 'react';
import styles from './app.module.scss'
import AuthRouter from "/@/router";

function App() {
  useEffect(() => {
    console.log('000');
  },[]);

  return (
    <div className={styles.app}>
      <AuthRouter/>
    </div>
  );
}

export default App;
