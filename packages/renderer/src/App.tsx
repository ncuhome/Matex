import React from 'react';
import styles from './app.module.scss';
import AuthRouter from '/@/router';
import { MatexWin } from '/@/Global/global';
import OrbitLoading from '/@cmp/Loading/OrbitLoading';

function App() {
  return <div className={styles.app}>{MatexWin.NodeApi.ipc ? <AuthRouter /> : <OrbitLoading />}</div>;
}

export default App;
