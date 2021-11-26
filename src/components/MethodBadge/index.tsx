import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';

interface BadgeProps {
  type?: 'get' | 'post' | 'put' | 'delete' | 'header';
}

const Badge: React.FC<BadgeProps> = ({ type = 'post' }) => {
  return (
    <div className={clsx([styles.badge, styles[type]])}>
      <div className={clsx([styles.inner, styles[`${type}Inner`]])}>Get</div>
    </div>
  );
};

export default Badge;
