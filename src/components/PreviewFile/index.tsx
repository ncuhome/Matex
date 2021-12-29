import React from 'react';
import styles from './index.module.scss';
import MonacoEditor from '../MonacoEditor';

const PreviewFile = () => {
  return (
    <div className={styles.con}>
      <MonacoEditor
        border={'#E0E1E2 1px solid'}
        name={'collect'}
        language={'json'}
        defaultVal={''}
        height={240}
        width={'100%'}
      />
    </div>
  );
};

export default PreviewFile;
