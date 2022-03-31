import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import Header from '../../components/Header';
import { useAtom } from 'jotai';
import { collapseAtom, fullscreenAtom, updateProgressAtom } from '/@/store/commonStore';
import { useAtomValue } from 'jotai/utils';
import useUpdateModal from '/@cmp/UpdateModal/useModal';
import useIpcOn from '/@/hooks/useIpcOn';
import { Update_Channel } from '/@common/ipc/channel';
import { IpcRendererEvent } from 'electron';
import type { DownloadProgress } from '/@common/index';
import toast from 'react-hot-toast';
import StartBtn from '/@cmp/StartBtn';

const Home: React.FC<any> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapse] = useAtom(collapseAtom);
  const [updateProgress, setUpdateProgress] = useAtom(updateProgressAtom);
  const isFullscreen = useAtomValue(fullscreenAtom);
  const { ToastView, openToast, closePortal } = useUpdateModal();

  const progressListener = (e: IpcRendererEvent, pro: DownloadProgress) => {
    console.log(pro);
    setUpdateProgress({ percent: pro.percent, transferred: pro.transferred, total: pro.total });
  };

  const finishedListener = (e: IpcRendererEvent) => {
    closePortal();
    setUpdateProgress(undefined);
  };

  useIpcOn(Update_Channel.StartDownload, () => {
    openToast();
  });
  useIpcOn(Update_Channel.UpdateCanceled, () => {
    toast.error('更新已取消');
  });
  useIpcOn(Update_Channel.DownloadProgress, progressListener);
  useIpcOn(Update_Channel.RelaunchDelay, (e: IpcRendererEvent) => {
    finishedListener(e);
    toast.success('更新将会在重启后安装');
  });
  useIpcOn(Update_Channel.UpdateDownloaded, finishedListener);

  useEffect(() => {
    navigate('/apiTest', { replace: true });
  }, []);

  const rootStyle = {
    marginLeft: isFullscreen ? 0 : 41,
    marginBottom: 30
  };

  return (
    <div className={styles.rootCon} style={rootStyle}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.con}>
        <div
          className={styles.sideBar}
          style={{ width: collapse ? '70px' : '220px', marginLeft: isFullscreen ? 0 : -40 }}
        >
          <SideBar />
        </div>
        <div className={styles.body}>
          <Outlet />
          {location.pathname.includes('websocket') && (
            <div className={styles.startBtn}>
              <StartBtn />
            </div>
          )}
        </div>
      </div>
      {updateProgress && (
        <ToastView
          done={updateProgress!.transferred}
          total={updateProgress!.total}
          progress={updateProgress!.percent}
        />
      )}
    </div>
  );
};

export default Home;
