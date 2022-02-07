import React from 'react';
import styles from './index.module.scss';
import type { IpcRendererEvent } from 'electron';
import { ApiTest_Channel } from '/@common/ipc/channel';
import type { FormatType } from '/@/type/apiTest';
import { ApiTestResProps } from '/@common/index';
import { apiTestBodyFormatAtom, apiTestResDataAtom } from '/@/store/apiTestStore';
import useIpcOn from '/@/hooks/useIpcOn';
import { Header } from '/@/pages/ApiTest/Body/Header';
import { isEditorAble } from '/@/pages/ApiTest/Body/utils';
import Content from '/@/pages/ApiTest/Body/Content';
import { useUpdateAtom } from 'jotai/utils';
import { judgementType } from '/@/utils/typeUtils';

const Body = () => {
  const setFormatType = useUpdateAtom(apiTestBodyFormatAtom);
  const setResData = useUpdateAtom(apiTestResDataAtom);

  const listen = (e: IpcRendererEvent, res: ApiTestResProps) => {
    const resType = judgementType(res.type);
    const canEditor = isEditorAble(resType);
    if (canEditor) {
      setFormatType(resType.toUpperCase() as FormatType);
    }
    setResData(res);
  };

  useIpcOn(ApiTest_Channel.Response, listen);

  return (
    <div className={styles.con}>
      <Header />
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  );
};

export default Body;
