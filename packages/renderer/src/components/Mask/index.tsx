import React from 'react';
import styles from './index.module.scss';

interface MaskProps {
  children: React.ReactNode;
}

const Mask: React.FC<MaskProps> = ({ children }) => {
  return (
    <div className={styles.mask}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Mask;
