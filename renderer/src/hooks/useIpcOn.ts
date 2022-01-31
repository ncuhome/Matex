import { useEffect } from 'react';
import { MatexWin } from '../global';
import type { IpcRendererEvent } from 'electron';

export type IpcListener = (e: IpcRendererEvent, msg?: any) => void;

const useIpcOn = (channel: string, listener: IpcListener) => {
  useEffect(() => {
    MatexWin.ipc?.on(channel, listener);
    return () => {
      MatexWin.ipc?.removeListener(channel, listener);
    };
  }, []);

  const off = () => {
    MatexWin.ipc?.removeListener(channel, listener);
  };
  return { off };
};

export default useIpcOn;
