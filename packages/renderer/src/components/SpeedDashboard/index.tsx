import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { draw } from '/@cmp/SpeedDashboard/draw';
import { testDownloadSpeed } from '/@cmp/SpeedDashboard/util';

const SpeedDashboard = () => {
  const [netSpeed, setSpeed] = React.useState(0);
  useEffect(() => {
    draw(netSpeed,netSpeed>20?20:5);
  }, [netSpeed]);

  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    const res1 = await testDownloadSpeed();
    const res2 = await testDownloadSpeed();
    const res3 = await testDownloadSpeed();
    const _speed = (res1.speed + res2.speed + res3.speed) / 3;
    const _costTime = (res1.costTime + res2.costTime + res3.costTime) / 3;
    setSpeed(Math.round((_speed / 1024)*10)/10);
    console.log(_speed, _costTime);
  };

  return (
    <div className={styles.con}>
      <canvas className={styles.canvas} id="speedDashboard" width="400" height="400"></canvas>
    </div>
  );
};

export default SpeedDashboard;
