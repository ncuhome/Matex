import React, { ChangeEvent } from 'react';
import styles from './index.module.scss';
import LabelInput from '../../../../components/LabelInput';
import Anchor from '@geist-ui/react-icons/anchor';

import MonacoEditor from '../../../../components/MonacoEditor';

const resOptions = ['JSON', 'Plain Text', 'File', 'Form Data'];
const methodsOptions = ['Get', 'Post', 'Put', 'Delete'];

const MockForm = () => {
  const [method, setMethod] = React.useState('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value);
  };
  return (
    <div className={styles.form}>
      <div className={styles.fullUrl}>
        <div style={{ marginRight: 10 }}>
          <LabelInput showLabel={false} label={'请求方法'} select options={methodsOptions} />
        </div>
        <input type="text" value={'http://localhost:8080/m'} onChange={() => {}} className={styles.urlText} />
      </div>
      <div className={styles.info}>
        <LabelInput label={'数据类型'} select options={resOptions} />
        <Anchor />
        <LabelInput label={'接口路径'} />
      </div>
      <div style={{ marginTop: 10, marginRight: 10 }}>
        <MonacoEditor name={'mock'} defaultVal={''} language={'json'} height={250} width={'100%'} />
      </div>
    </div>
  );
};

export default MockForm;
