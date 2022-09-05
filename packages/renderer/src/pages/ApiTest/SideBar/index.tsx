import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import SidebarHeader from '/@/pages/ApiTest/SideBar/Header/Header';
import ProjectList from '/@/pages/ApiTest/SideBar/ProjectList';
import { useAtomValue } from 'jotai';
import { SidebarMenuTypeAtom } from '/@/store/ApiTest/sidebar.store';
import SpeedTest from '/@/pages/ApiTest/SideBar/SpeedTest';
import { PlayButton, PlayButtonProps, PlayStatus, usePlayButton } from '/@cmp/PlayButton';
import { useSendReq } from '/@/Ipc/apiTest/apiTest.ipc';

const ApiTestSideBar = () => {
  const sidebarMenuType = useAtomValue(SidebarMenuTypeAtom);
  const {sendReq,onResponse} = useSendReq();
  const [status, setStatus] = useState<PlayStatus>('idle');
  const { startProcessing, completed } = usePlayButton('apiTestBtn');

  useEffect(()=>{
    onResponse((e,res)=>{
      console.log(res)
    })
  },[])

  const handleSend = () => {
    if (status === 'idle') {
      sendReq();
      startProcessing();
      setStatus('processing');
      setTimeout(() => {
        completed();
        setStatus('idle');
      }, 5000);
    } else {
      completed();
      setStatus('idle');
    }
  };

  return (
    <div className={styles.sidebar}>
      <SidebarHeader />
      <div className={styles.body}>{sidebarMenuType === '项目接口' ? <ProjectList /> : <SpeedTest />}</div>
      <div className={styles.footer}>
        <PlayButton id={'apiTestBtn'} onClick={handleSend} />
      </div>
    </div>
  );
};

export default ApiTestSideBar;
