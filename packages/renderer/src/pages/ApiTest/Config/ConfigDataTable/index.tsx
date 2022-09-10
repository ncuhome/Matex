import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { ReqBodyType, ReqConfigType, SelReqType } from '/@/store/ApiTest/config.store';
import { NotifyIllustration } from '/@cmp/Illustration/notify';
import RenderMonacoEditor from '/@/pages/ApiTest/Config/ConfigDataTable/renderMonacoEditor';
import UploadFile from '/@cmp/UploadFile';
import { RenderKVTable } from '/@/pages/ApiTest/Config/ConfigDataTable/KVTable';
import Tabs from '/@cmp/Tabs';
import { BodyTypes, ConfigTableTitleMap } from '/@/Model/ApiTest.model';
import styles from './index.module.scss';
import Authorization from '/@/pages/ApiTest/Config/Authorization';

const ConfigTable = () => {
  const reqType = useAtomValue(SelReqType);
  const reqConfigType = useAtomValue(ReqConfigType);
  const [reqBodyType, setReqBodyType] = useAtom(ReqBodyType);

  if (reqConfigType === 'auth') {
    return <Authorization />;
  }

  const renderComponent = () => {
    if (reqType === 'get' && reqConfigType === 'body') {
      return <NotifyIllustration desc={'推荐使用params传递Get请求参数'} />;
    }
    if ((reqType === 'post' || reqType === 'put') && reqConfigType === 'params') {
      return <NotifyIllustration desc={'推荐使用body传递Post|Put请求参数'} />;
    }
    if (reqConfigType === 'body' && reqBodyType === 'raw') {
      return <RenderMonacoEditor />;
    } else if (reqConfigType === 'body' && reqBodyType === 'binary') {
      return <UploadFile />;
    } else {
      return <RenderKVTable />;
    }
  };

  const renderTitle = () => {
    if ((reqType === 'post' || reqType === 'put') && reqConfigType === 'body') {
      return (
        <Tabs
          style={{ margin: '1px 0px 10px -2px' }}
          width={6.8}
          menus={BodyTypes}
          selectedKey={reqBodyType}
          onSelect={(_, sel) => setReqBodyType(sel)}
        />
      );
    } else {
      if (ConfigTableTitleMap.get(reqType + '-' + reqConfigType)) {
        return <div className={styles.text}>{ConfigTableTitleMap.get(reqType + '-' + reqConfigType)}:</div>;
      } else {
        return null;
      }
    }
  };

  return (
    <div className={styles.configParamsCon}>
      {renderTitle()}
      <div className={styles.tableCon}>{renderComponent()}</div>
    </div>
  );
};

export default ConfigTable;
