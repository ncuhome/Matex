import React from 'react';
import styles from './index.module.scss';
import { AuthType, AuthTypeList, SelConfigs } from '/@/Model/ApiTest.model';
import MyDropDown from '/@cmp/DropDown';
import { useAtom } from 'jotai';
import { AuthTypeAtom } from '/@/store/ApiTest/config.store';
import {
  ApiKeyAuth,
  BasicAuth,
  BearerAuth,
  DigestAuth,
  NoneAuth
} from '/@/pages/ApiTest/Config/Authorization/NormalAuth';

const AuthCompMap = new Map<AuthType, React.ReactNode>([
  ['None', <NoneAuth />],
  ['ApiKey', <ApiKeyAuth />],
  ['Bearer', <BearerAuth />],
  ['Basic', <BasicAuth />],
  ['Digest', <DigestAuth />]
]);

const Authorization = () => {
  const [authType, setAuthType] = useAtom(AuthTypeAtom);
  return (
    <div className={styles.auth}>
      <div className={styles.type}>
        <div className={styles.selection}>
          <div className={styles.typeText}>类型:</div>
          <div className={styles.dropDown}>
            <MyDropDown
              large
              width={100}
              menus={AuthTypeList}
              selectedKey={authType}
              onSelectionChange={(_, sel: any) => setAuthType(sel)}
            />
          </div>
        </div>
        <div className={styles.desc}>摘要：电子信息产业是我国的支柱产业之一，其具有丰富的内涵</div>
      </div>
      <div className={styles.form}>{AuthCompMap.get(authType)}</div>
    </div>
  );
};

export default Authorization;
