import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import type { IpcRendererEvent } from 'electron';
import { ApiTest_Channel } from '/@common/ipc/channel';
import type { FormatType } from '/@/type/apiTest';
import { ApiTestResProps, ReqError } from '/@common/index';
import {
  apiTestBodyActionAtom,
  apiTestBodyFormatAtom,
  apiTestErrAtom,
  apiTestResDataAtom
} from '/@/store/apiTestStore';
import useIpcOn from '/@/hooks/useIpcOn';
import { Header } from '/@/pages/ApiTest/SingleTest/Body/Header';
import { isEditorAble } from '/@/pages/ApiTest/SingleTest/Body/utils';
import Content from '/@/pages/ApiTest/SingleTest/Body/Content';
import { useUpdateAtom } from 'jotai/utils';
import { judgementType } from '/@/utils/typeUtils';
import { Emitter } from '/@/utils/EventEmiter';
import { Button, Dimmer, Loader, Segment } from 'semantic-ui-react';
import Emittery from 'emittery';

const Body = () => {
  const setFormatType = useUpdateAtom(apiTestBodyFormatAtom);
  const setBodyAction = useUpdateAtom(apiTestBodyActionAtom);
  const setResData = useUpdateAtom(apiTestResDataAtom);
  const setErrObj = useUpdateAtom(apiTestErrAtom);
  const listenerRef = useRef<Emittery.UnsubscribeFn>();
  const [dimmer, setDimmer] = useState(false);

  const listen = (e: IpcRendererEvent, res: ApiTestResProps) => {
    const resType = judgementType(res.type);
    const canEditor = isEditorAble(resType);
    if (canEditor) {
      const type = resType.toUpperCase() as FormatType;
      setFormatType(type);
      Emitter.emit('apiTest.format', type);
    }
    setBodyAction('Pretty');
    setResData(res);
    setErrObj(undefined);
    setDimmer(false);
  };

  const errListener = (e: IpcRendererEvent, res: ReqError) => {
    setErrObj(res);
    setResData(undefined);
    setDimmer(false);
  };

  //监听接收到请求数据
  useIpcOn(ApiTest_Channel.Response, listen);
  useIpcOn(ApiTest_Channel.ReqError, errListener);

  useEffect(() => {
    listenerRef.current = Emitter.on('apiTest.bodyDimmer', (data: any) => {
      setDimmer(data);
    });
    return () => {
      listenerRef.current?.();
    };
  }, []);

  const cancelSend = () => {
    setDimmer(false);
  };

  const stylesDimmer = {
    background: 'transparent',
    border: 'none',
    margin: 0,
    padding: 0,
    boxShadow: 'none',
    borderRadius: 10
  };

  return (
    <Dimmer.Dimmable blurring style={stylesDimmer} as={Segment} dimmed={dimmer}>
      <div className={styles.con}>
        <Header />
        <div className={styles.content}>
          <Content />
        </div>
      </div>
      <Dimmer active={dimmer} verticalAlign="top">
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
