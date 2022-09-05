import React from 'react';
import styles from './index.module.scss';

interface MaskProps {
  isMask: boolean;
  overlayPanel: React.ReactNode;
  bgColor?: string;
  children: React.ReactNode;
}

const Mask: React.FC<MaskProps> = ({
  overlayPanel,
  isMask = false,
  children,
  bgColor = 'rgba(45,56,97,0.8)'
}) => {
  return (
    <div className={styles.mask}>
      <div
        className={styles.overlayPanel}
        style={{ display: isMask ? 'block' : 'none', background: isMask ? bgColor : 'transparent' }}
      >
        {overlayPanel}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Mask;
