import Center from '/@cmp/Center';
import styles from './index.module.scss';
import Input from '/@cmp/Input';
import { useState } from 'react';
import MyDropDown from '/@cmp/DropDown';
import clsx from 'clsx';
import Checkbox from '/@cmp/Checkbox';
import { useAtom } from 'jotai';
import { AuthValueAtom } from '/@/store/ApiTest/config.store';

export const NoneAuth = () => {
  return (
    <div>
      <Center>
        <span style={{ color: 'var(--light-text1)' }}>本次请求不携带任何认证信息</span>
      </Center>
    </div>
  );
};

export const ApiKeyAuth = () => {
  const [authValue, setAuthValue] = useAtom(AuthValueAtom);

  const onChange = (key: 'key' | 'value' | 'addTo', value: string) => {
    setAuthValue((draft) => {
      draft.ApiKey[key as any] = value;
      return draft;
    });
  };

  return (
    <div className={styles.authCon}>
      <div className={styles.apiKeyItem}>
        <div>键</div>
        <Input
          style={{ width: 220 }}
          value={authValue.ApiKey.key}
          onChange={(e) => onChange('key', e.target.value)}
        />
      </div>
      <div className={styles.apiKeyItem}>
        <div>值</div>
        <Input
          style={{ width: 220 }}
          value={authValue.ApiKey.value}
          onChange={(e) => onChange('value', e.target.value)}
        />
      </div>
      <div className={styles.apiKeyItem}>
        <div>添加到</div>
        <MyDropDown
          width={100}
          menus={['header', 'param']}
          selectedKey={authValue.ApiKey.addTo}
          onSelectionChange={(_, sel) => onChange('addTo', sel)}
        />
      </div>
    </div>
  );
};

export const BearerAuth = () => {
  const [authValue, setAuthValue] = useAtom(AuthValueAtom);

  const onChange = (value: string) => {
    setAuthValue((draft) => {
      draft.Bearer = value;
      return draft;
    });
  };
  return (
    <Center style={{ margin: '0 10px' }}>
      <div className={styles.authLine}>
        <div>Token</div>
        <Input value={authValue.Bearer} style={{ width: 350 }} onChange={(e) => onChange(e.target.value)} />
      </div>
    </Center>
  );
};

export const BasicAuth = () => {
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [authValue, setAuthValue] = useAtom(AuthValueAtom);

  const onChange = (key: 'username' | 'password', value: string) => {
    setAuthValue((draft) => {
      draft.Basic[key] = value;
      return draft;
    });
  };
  return (
    <div className={clsx([styles.authCon, styles.basicAuth])}>
      <div className={styles.apiKeyItem}>
        <div>username</div>
        <Input
          value={authValue.Basic.username}
          style={{ width: 220 }}
          onChange={(e) => onChange('username', e.target.value)}
        />
      </div>
      <div className={styles.apiKeyItem}>
        <div>password</div>
        <Input
          value={authValue.Basic.password}
          style={{ width: 220 }}
          type={showPwd ? 'text' : 'password'}
          onChange={(e) => onChange('password', e.target.value)}
        />
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
  const [authValue, setAuthValue] = useAtom(AuthValueAtom);

  const onChange = (key: 'username' | 'password', value: string) => {
    setAuthValue((draft) => {
      draft.Digest[key] = value;
      return draft;
    });
  };

  return (
    <div className={clsx([styles.authCon, styles.digestAuth])}>
      <div className={styles.apiKeyItem}>
        <div>username</div>
        <Input
          value={authValue.Digest.username}
          style={{ width: 220 }}
          onChange={(e) => onChange('username', e.target.value)}
        />
      </div>
      <div className={styles.apiKeyItem}>
        <div>password</div>
        <Input
          value={authValue.Digest.password}
          style={{ width: 220 }}
          type={showPwd ? 'text' : 'password'}
          onChange={(e) => onChange('password', e.target.value)}
        />
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
