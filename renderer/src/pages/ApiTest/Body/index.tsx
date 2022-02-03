import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import MonacoEditor from '/@cmp/MonacoEditor';
import { myEmitter } from '/@/utils/EventEmiter';
import type { IpcRendererEvent } from 'electron';
import { LanguageMapper } from '/@/components/MonacoEditor/utils';
import { ApiTest_Channel } from '/@common/ipc/channel';
import type { FormatType } from '/@/type/apiTest';
import { ApiTestResProps } from '/@common/index';
import { useAtom } from 'jotai';
import { apiTestResDataAtom } from '/@/store/apiTestStore';
import useIpcOn from '/@/hooks/useIpcOn';
import { renderHeader } from '/@/pages/ApiTest/Body/renderHeader';

const Body = () => {
  const [formatType, setFormatType] = useState<FormatType>('JSON');
  const [resData, setResData] = useAtom(apiTestResDataAtom);

  const listen = useCallback(
    (e: IpcRendererEvent, res: ApiTestResProps) => {
      if (formatType.toLowerCase() !== res.type) {
        setFormatType(res.type.toUpperCase() as FormatType);
      }
      setResData(res);
    },
    [formatType]
  );

  useIpcOn(ApiTest_Channel.Response, listen);

  useEffect(() => {
    if (resData) {
      myEmitter.emit('monacoEditor-apiTest', resData.body);
    }
  }, [resData]);

  const handleChangeFormat = (event: SyntheticEvent, { value }: any) => {
    setFormatType(value);
  };

  return (
    <div className={styles.con}>
      <div className={styles.editorCon}>
        <MonacoEditor
          shadow={true}
          border={'transparent 1px solid'}
          actions={renderHeader({ formatType, handleChangeFormat })}
          name={'apiTest'}
          language={LanguageMapper.get(formatType.toLowerCase())!}
          defaultVal={''}
          height={235}
          width={'100%'}
        />
      </div>
    </div>
  );
};

export default Body;
