import React from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import CloseIcon from '/@cmp/svg/CloseIcon';

interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onClear?: () => void;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className={styles.inputCon}>
      <input className={clsx([styles.input, props.className])} {...props} />
      <div className={styles.clearIcon} onClick={() => props.onClear?.()}>
        <CloseIcon fill={'var(--light-text1)'} className={clsx(['svgIcon', 'hover'])} />
      </div>
    </div>
  );
};

export default Input;
