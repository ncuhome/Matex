import React from 'react';
import styles from './index.module.scss';
import { useRive, RiveParameters, Fit } from 'rive-react';

const Loading = () => {
  const params = {
    src: './runner_boy.riv',
    autoplay: true
  } as RiveParameters;
  const { RiveComponent, rive } = useRive(params as any);
  return (
    <div className={styles.loading}>
      <RiveComponent />
    </div>
  );
};

export default Loading;
