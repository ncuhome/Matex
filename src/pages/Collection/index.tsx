import React from 'react';
import styles from './index.module.scss';
import MonacoEditor from '../../components/MonacoEditor';
import { myEmitter } from '../../utils/EventEmiter';
import { Button, ButtonGroup, TextField } from '@mui/material';
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
      <div className={styles.edit}>
        <div className={styles.btnGroup}>
          <ButtonGroup size="small" variant="outlined" color={'info'}>
            <Button sx={{ textTransform: 'none', backgroundColor: '#424557', color: '#FFF' }}>Pretty</Button>
            <Button sx={{ textTransform: 'none', backgroundColor: '#424557', color: '#FFF' }}>Two</Button>
            <Button sx={{ textTransform: 'none', backgroundColor: '#424557', color: '#FFF' }}>Three</Button>
          </ButtonGroup>
        </div>
        <MonacoEditor name={'collect'} language={'json'} defaultVal={''} height={300} width={'100%'} />
      </div>
    </div>
  );
};

export default Collection;
