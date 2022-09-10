import Center from '/@cmp/Center';
import styles from './index.module.scss';
import Input from '/@cmp/Input';
import { useState } from 'react';
import MyDropDown from '/@cmp/DropDown';
import clsx from 'clsx';
import Checkbox from '/@cmp/Checkbox';
export const NoneAuth = () => {
  return (
    <div>
      <Center>
        <span style={{ color: 'var(--light-text1)' }}>本次请求不携带任何认证信息</span>
      </Center>
    </div>
  );
};
type AddTo = 'header' | 'param';
export const ApiKeyAuth = () => {
  const [addTo, setAddTo] = useState<AddTo>('header');
  return (
    <div className={styles.authCon}>
      <div className={styles.apiKeyItem}>
        <div>键</div>
        <Input style={{ width: 220 }} />
      </div>
      <div className={styles.apiKeyItem}>
        <div>值</div>
        <Input style={{ width: 220 }} />
      </div>
      <div className={styles.apiKeyItem}>
        <div>添加到</div>
        <MyDropDown
          width={100}
          menus={['header', 'param']}
          selectedKey={addTo}
          onSelectionChange={(_, sel) => setAddTo(sel as AddTo)}
        />
      </div>
    </div>
  );
};

export const BearerAuth = () => {
  return (
    <Center style={{ margin: '0 10px' }}>
      <div className={styles.authLine}>
        <div>Token</div>
        <Input style={{ width: 350 }} />
      </div>
    </Center>
  );
};

export const BasicAuth = () => {
  const [showPwd, setShowPwd] = useState<boolean>(false);
  return (
    <div className={clsx([styles.authCon, styles.basicAuth])}>
      <div className={styles.apiKeyItem}>
        <div>username</div>
        <Input style={{ width: 220 }} />
      </div>
      <div className={styles.apiKeyItem}>
        <div>password</div>
        <Input style={{ width: 220 }} type={showPwd?'text':'password'}/>
      </div>
      <div className={styles.showPwd}>
        <div className={styles.checkBox}>
          <Checkbox checked={showPwd} onChange={(value) => setShowPwd(value)} />
        </div>
        <div className={styles.text}>显示密码</div>
      </div>
    </div>
  );
};

export const DigestAuth = () => {
  const [showPwd, setShowPwd] = useState<boolean>(false);
  return (
      <div className={clsx([styles.authCon, styles.digestAuth])}>
        <div className={styles.apiKeyItem}>
          <div>username</div>
          <Input style={{ width: 220 }} />
        </div>
        <div className={styles.apiKeyItem}>
          <div>password</div>
          <Input style={{ width: 220 }} type={showPwd?'text':'password'}/>
        </div>
        <div className={styles.showPwd}>
          <div className={styles.checkBox}>
            <Checkbox checked={showPwd} onChange={(value) => setShowPwd(value)} />
          </div>
          <div className={styles.text}>显示密码</div>
        </div>
      </div>
  );
};
