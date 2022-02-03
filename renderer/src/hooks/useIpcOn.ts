import { useEffect, useRef } from 'react';
import { MatexWin } from '../global';
import type { IpcRendererEvent } from 'electron';

export type IpcListener = (e: IpcRendererEvent, msg?: any) => void;

const useIpcOn = (channel: string, listener: IpcListener) => {
  const listenerRef = useRef<IpcListener>(listener);
  useEffect(() => {
    MatexWin.ipc?.removeListener(channel, listenerRef.current);
    listenerRef.current = listener;
    MatexWin.ipc?.on(channel, listener);
    return () => {
      MatexWin.ipc?.removeListener(channel, listener);
    };
  }, [listener]);

  const off = () => {
    MatexWin.ipc?.removeListener(channel, listener);
  };
  return { off };
};

export default useIpcOn;
