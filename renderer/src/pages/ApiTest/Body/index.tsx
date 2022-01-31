import React, { SyntheticEvent, useState } from 'react';
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
import { Button, Icon, Label } from 'semantic-ui-react';

const Body = () => {
  const [formatType, setFormatType] = useState<FormatType>('JSON');
  const [resData, setResData] = useAtom(apiTestResDataAtom);

  const listen = (e: IpcRendererEvent, res: ApiTestResProps) => {
    setResData(res);
    myEmitter.emit('monacoEditor-apiTest', res.body);
  };
  useIpcOn(ApiTest_Channel.Response, listen);

  console.log(resData);

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
          height={240}
          width={'100%'}
        />
      </div>
      <div className={styles.ops}>
        <Label style={{ marginLeft: -40 }} color={'black'}>
          <Icon name="wrench" /> 操作
        </Label>
        <div className={styles.btns}>
          <Button icon labelPosition="left">
            <Icon name="save" />
            保存
          </Button>
          <Button icon labelPosition="left">
            <Icon name="tag" />
            标签
          </Button>
          <Button icon labelPosition="left">
            <Icon name="trash alternate" />
            删除
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Body;
