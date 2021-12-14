import React from 'react';
import styles from './index.module.scss';
import MonacoEditor from '../../components/MonacoEditor';
import { myEmitter } from '../../utils/EventEmiter';
import { Button } from '@mui/material';

const Collection = () => {
  const handleClick = () => {
    myEmitter.emit<string>('monacoEditor-collect', JSON.stringify({ ok: 1, hello: 'hello' }));
  };

  return (
    <div className={styles.collection}>
      <div>
        <Button variant="outlined" onClick={handleClick}>
          发送
        </Button>
      </div>
      <MonacoEditor name={'collect'} language={'json'} defaultVal={''} height={300} width={'100%'} />
    </div>
  );
};

export default Collection;
