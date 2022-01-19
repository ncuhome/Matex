import React, { useState } from 'react';
import styles from './index.module.scss';

interface EditorLineProps {
  index: number;
  type: 'key' | 'value';
  value: string;
  onChange?: (value: string) => void;
}

const EditorLine: React.FC<EditorLineProps> = ({ value, onChange }) => {
  const [val, setVal] = useState(value);
  return (
    <input
      value={val}
      className={styles.input}
      onChange={(e) => {
        setVal(e.target.value);
        onChange?.(e.target.value);
      }}
    />
  );
};

export default EditorLine;
