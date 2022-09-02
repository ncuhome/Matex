import React from 'react';
import styles from './index.module.scss';

interface MaskProps {
  bgColor?: string;
  children: React.ReactNode;
}

const Mask: React.FC<MaskProps> = ({ children, bgColor = 'rgba(45,56,97,0.8)' }) => {
  return (
    <div className={styles.mask} style={{ background: bgColor }}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Mask;
