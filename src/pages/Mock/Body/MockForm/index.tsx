import React, { ChangeEvent } from 'react';
import styles from './index.module.scss';
import Anchor from '@geist-ui/react-icons/anchor';

import MonacoEditor from '../../../../components/MonacoEditor';
import { Button, ButtonGroup, Input, Select, Spacer } from '@geist-ui/react';
import Link2 from '@geist-ui/react-icons/link2';
import Settings from '@geist-ui/react-icons/settings';
import { MethodsOptions, ResultOptions } from '../../../../Model/request.model';

const MockForm = () => {
  const [method, setMethod] = React.useState('');

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value);
  };
  return (
    <div className={styles.form}>
      <div className={styles.fullUrl}>
        <div style={{ marginRight: 10 }}>
          <Select
            placeholder="选择工作"
            initialValue={'Get'}
            width={5.5}
            height={1.1}
            style={{ minWidth: '0px' }}
          >
            {MethodsOptions.map((item, index) => (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Spacer w={1} />
        <Anchor />
        <Spacer w={1} />
        <Input height={1.2} value={'http://localhost:8080/m'} width={'100%'} onChange={() => {}} />
      </div>
      <div className={styles.info}>
        <Input label="端口" width={'100%'} placeholder="一个基础示例" />
        <Spacer w={1} />
        <Link2 />
        <Spacer w={1} />
        <Input label="/" width={'100%'} placeholder="https://github" />
      </div>
      <div className={styles.editorCon}>
        <div className={styles.opBtnGroup}>
          <ButtonGroup scale={2 / 3}>
            <Button scale={2 / 3} style={{ backgroundColor: '#000', color: '#FFF' }}>
              Pretty
            </Button>
            <Button scale={2 / 3}>Raw</Button>
            <Button scale={2 / 3}>Preview</Button>
          </ButtonGroup>
          <Select placeholder="选择工作方式" width={5.5} initialValue={'JSON'} style={{ minWidth: '0px' }}>
            {ResultOptions.map((item, index) => (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
          <Button icon={<Settings />} auto scale={2 / 3} px={0.6} ml={1} />
        </div>
        <div className={styles.editor}>
          <MonacoEditor name={'mock'} defaultVal={''} language={'json'} height={260} width={'100%'} />
        </div>
      </div>
    </div>
  );
};

export default MockForm;
