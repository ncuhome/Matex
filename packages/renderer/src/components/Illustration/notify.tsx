import React from 'react';
import styles from './index.module.scss';
import notifySvg from '/@/assets/images/notify.svg';

interface IllustrationProps {
  desc: string;
}

export const NotifyIllustration: React.FC<IllustrationProps> = ({  desc }) => {
  return (
    <div className={styles.notify}>
      <img src={notifySvg} className={styles.img}  alt={desc}/>
      <div className={styles.desc}>{desc}</div>
    </div>
  );
};
