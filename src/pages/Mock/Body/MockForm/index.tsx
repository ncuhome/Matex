import React, { ChangeEvent } from 'react';
import styles from './index.module.scss';
import Anchor from '@geist-ui/react-icons/anchor';

import MonacoEditor from '../../../../components/MonacoEditor';
import { Input, Select, Spacer } from '@geist-ui/react';
import Link2 from '@geist-ui/react-icons/link2';

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
          <Select placeholder="选择工作" width={5.5} style={{ minWidth: '0px' }}>
            <Select.Option value="1">远程工作</Select.Option>
            <Select.Option value="2">线下工作</Select.Option>
          </Select>
          {/*<LabelInput showLabel={false} label={'请求方法'} select options={methodsOptions} />*/}
        </div>
        <Spacer w={1} />
        <Anchor />
        <Spacer w={1} />
        <Input value={'http://localhost:8080/m'} width={'100%'} onChange={() => {}} />
      </div>
      <div className={styles.info}>
        <Input label="端口" width={'100%'} placeholder="一个基础示例" />
        <Spacer w={1} />
        <Link2 />
        <Spacer w={1} />
        <Input label="/" width={'100%'} placeholder="https://github" />
      </div>
      <div style={{ marginTop: 10, marginRight: 10 }}>
        <MonacoEditor name={'mock'} defaultVal={''} language={'json'} height={250} width={'100%'} />
      </div>
    </div>
  );
};

export default MockForm;
