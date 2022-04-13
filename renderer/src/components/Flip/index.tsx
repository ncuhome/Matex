import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

interface FlipProps {
  flip: boolean
  frontEle: React.ReactNode
  backEle: React.ReactNode
}

const Flip:React.FC<FlipProps> = ({flip,frontEle,backEle}) => {
  return (
    <div className={clsx([styles.panel,flip&&styles.flip])}>
      <div className={styles.front}>
        {frontEle}
      </div>
      <div className={styles.back}>
        {backEle}
      </div>
    </div>
  );
};

export default Flip;
