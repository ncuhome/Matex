import React from 'react';
import styles from './index.module.scss';

interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div className={styles.btn} onClick={onClick}>
      {label}
    </div>
  );
};

export default Button;
