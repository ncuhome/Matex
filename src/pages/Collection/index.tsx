import React from 'react';
import styles from './index.module.scss';
import MonacoEditor from '../../components/MonacoEditor';
import { myEmitter } from '../../utils/EventEmiter';
import { Button, TextField } from '@mui/material';
import { Window } from '../../type';

const Collection = () => {
  const handleClick = async () => {
    const res = await Window.Mixos.get('http://localhost:9000/test');
    myEmitter.emit<string>('monacoEditor-collect', JSON.stringify(res));
  };

  return (
    <div className={styles.collection}>
      <div>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <Button variant="outlined" onClick={handleClick}>
          发送
        </Button>
      </div>
      <MonacoEditor name={'collect'} language={'json'} defaultVal={''} height={300} width={'100%'} />
    </div>
  );
};

export default Collection;
