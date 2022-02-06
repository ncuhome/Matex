import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import type { IpcRendererEvent } from 'electron';
import { ApiTest_Channel } from '/@common/ipc/channel';
import type { FormatType } from '/@/type/apiTest';
import { ApiTestResProps } from '/@common/index';
import { apiTestResDataAtom } from '/@/store/apiTestStore';
import useIpcOn from '/@/hooks/useIpcOn';
import { Header } from '/@/pages/ApiTest/Body/Header';
import { identifyType } from '/@/pages/ApiTest/Body/utils';
import renderContent from '/@/pages/ApiTest/Body/renderContent';
import { useUpdateAtom } from 'jotai/utils';
import { judgementType } from '/@/utils/typeUtils';

const Body = () => {
  const [formatType, setFormatType] = useState<FormatType>('JSON');
  const setResData = useUpdateAtom(apiTestResDataAtom);
  const [editAble, setEditAble] = useState(true);

  const listen = useCallback(
    (e: IpcRendererEvent, res: ApiTestResProps) => {
      const resType = judgementType(res.type).toUpperCase();
      if (formatType !== resType) {
        if (identifyType(resType.toLowerCase()) && !editAble) {
          setFormatType(resType as FormatType);
        } else {
          setEditAble(false);
        }
      }
      setResData(res);
    },
    [formatType]
  );

  useIpcOn(ApiTest_Channel.Response, listen);

  const handleChangeFormat = (event: SyntheticEvent, { value }: any) => {
    setFormatType(value);
  };

  return (
    <div className={styles.con}>
      <Header formatType={formatType} handleChangeFormat={handleChangeFormat} />
      <div className={styles.content}>{renderContent(editAble, formatType)}</div>
    </div>
  );
};

export default Body;
