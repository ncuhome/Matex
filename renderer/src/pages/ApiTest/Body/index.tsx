import React, { useEffect, useState } from 'react';
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
import { Emitter } from '/@/utils/EventEmiter';
import { Button, Dimmer, Loader, Segment } from 'semantic-ui-react';

const Body = () => {
  const setFormatType = useUpdateAtom(apiTestBodyFormatAtom);
  const setResData = useUpdateAtom(apiTestResDataAtom);
  const [dimmer, setDimmer] = useState(false);

  const listen = (e: IpcRendererEvent, res: ApiTestResProps) => {
    const resType = judgementType(res.type);
    const canEditor = isEditorAble(resType);
    if (canEditor) {
      setFormatType(resType.toUpperCase() as FormatType);
    }
    setResData(res);
  };

  //监听接收到请求数据
  useIpcOn(ApiTest_Channel.Response, listen);

  useEffect(() => {
    Emitter.on('apiTest.bodyDimmer', (data) => {
      setDimmer(data);
    });
  }, []);

  const cancelSend = () => {
    setDimmer(false);
  };

  const stylesDimmer = {
    background: 'transparent',
    border: 'none',
    margin: 0,
    padding: 0
  };

  return (
    <Dimmer.Dimmable style={stylesDimmer} blurring as={Segment} dimmed={dimmer}>
      <div className={styles.con}>
        <Header />
        <div className={styles.content}>
          <Content />
        </div>
      </div>
      <Dimmer inverted active={dimmer} onClickOutside={() => {}} verticalAlign="top">
        <Loader className={styles.loading} size="medium">
          <div className={styles.loadingContent}>
            <div style={{ marginBottom: 15, marginTop: 5 }}>发送请求中...</div>
            <Button size={'tiny'} onClick={cancelSend}>
              取消
            </Button>
          </div>
        </Loader>
      </Dimmer>
    </Dimmer.Dimmable>
  );
};

export default Body;
