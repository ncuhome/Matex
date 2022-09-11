import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import SidebarHeader from '/@/pages/ApiTest/SideBar/Header/Header';
import ProjectList from '/@/pages/ApiTest/SideBar/ProjectList';
import { useAtom, useAtomValue } from 'jotai';
import { SidebarMenuTypeAtom } from '/@/store/ApiTest/sidebar.store';
import SpeedTest from '/@/pages/ApiTest/SideBar/SpeedTest';
import { PlayButton, PlayStatus, usePlayButton } from '/@cmp/PlayButton';
import { useSendReq } from '/@/Ipc/apiTest/apiTest.ipc';
import { ResultAtom } from '/@/store/ApiTest/result.store';
import type { ApiTestRes, ReqError } from '/@common/apiTest';
import { emittery } from '/@/utils/instance';
import Emittery from 'emittery';

const ApiTestSideBar = () => {
  const sidebarMenuType = useAtomValue(SidebarMenuTypeAtom);
  const [result, setResult] = useAtom(ResultAtom);
  const { sendReq, onResponse } = useSendReq();
  const [status, setStatus] = useState<PlayStatus>('idle');
  const { startProcessing, reset, completed } = usePlayButton('apiTestBtn');
  const timeRef = useRef<Emittery.UnsubscribeFn>();

  let success = false;
  success = !!(result && !result.isError);

  useEffect(() => {
    onResponse((e, res: ApiTestRes) => {
      completed();
      setStatus('idle');
      setResult(res as ApiTestRes);
    });
  }, []);

  useEffect(() => {
    timeRef.current?.();
    timeRef.current = emittery.on('keyDown:sendReq', () => {
      handleSend();
    });
    return () => {
      timeRef.current?.();
    };
  }, [sendReq]);

  const handleSend = () => {
    if (status === 'idle') {
      const success = sendReq();
      if (success) {
        startProcessing();
        setStatus('processing');
      }
    } else {
      reset();
      setStatus('idle');
    }
  };

  return (
    <div className={styles.sidebar}>
      <SidebarHeader />
      <div className={styles.body}>{sidebarMenuType === '项目接口' ? <ProjectList /> : <SpeedTest />}</div>
      <div className={styles.footer}>
        <PlayButton id={'apiTestBtn'} onClick={handleSend} success={success} />
      </div>
    </div>
  );
};

export default ApiTestSideBar;
