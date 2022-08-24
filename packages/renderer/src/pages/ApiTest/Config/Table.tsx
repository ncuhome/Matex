import React from 'react';
import styles from '/@/pages/ApiTest/Config/index.module.scss';
import {
  ReqBodyType,
  ReqConfigType,
  SelReqType,
} from '/@/store/ApiTest/config.store';
import { useAtom, useAtomValue } from 'jotai';
import {BodyTypes, ConfigTableTitleMap} from '/@/Model/ApiTest.model';
import UploadFile from '/@cmp/UploadFile';
import { NotifyIllustration } from '/@cmp/Illustration/notify';
import Tabs from '/@cmp/Tabs';
import { RenderKVTable, RenderMonacoEditor } from '/@/pages/ApiTest/Config/ConfigDataTable/renderConfig';

const ConfigTable = () => {
  const reqConfigType = useAtomValue(ReqConfigType);
  const reqType = useAtomValue(SelReqType);
  const [reqBodyType, setReqBodyType] = useAtom(ReqBodyType);

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
    if ((reqType==='post'||reqType==='put')&&reqConfigType==='body'){
      return (
          <Tabs
              width={6}
              menus={BodyTypes}
              selectedKey={reqBodyType}
              onSelect={(_, sel) => setReqBodyType(sel)}
          />
      )
    } else {
      return ConfigTableTitleMap.get(reqType+'-' + reqConfigType)
    }
  }

  return (
    <div className={styles.configParamsCon}>
      <div className={styles.title}>
        {
          renderTitle()
        }
      </div>
      <div className={styles.tableCon}>{renderComponent()}</div>
    </div>
  );
};

export default ConfigTable;
