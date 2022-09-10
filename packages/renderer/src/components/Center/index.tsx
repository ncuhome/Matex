import React from 'react';
import styles from './index.module.scss';
interface PropType {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Center: React.FC<PropType> = ({ children, style }) => {
  return (
    <div className={styles.center} style={style}>
      {children}
    </div>
  );
};

export default Center;
