import React, { ChangeEvent, Fragment } from 'react';
import styles from './index.module.scss';
import { Box } from '@material-ui/core';

const options = ['JSON', 'Plain Text', 'File', 'Form Data'];

const MockForm = () => {
  const [method, setMethod] = React.useState('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value);
  };
  return (
    <div className={styles.form}>
      <div className={styles.fullUrl}>
        <Box sx={{ minWidth: 120 }}>
          <select className={styles.select} placeholder={'请选择类型'} onChange={handleChange}>
            {options.map((option) => {
              return (
                <Fragment key={option}>
                  <option value={option}>{option}</option>
                </Fragment>
              );
            })}
          </select>
        </Box>
        <input type="text" value={'http://localhost:8080/m'} className={styles.urlText} />
      </div>
    </div>
  );
};

export default MockForm;
