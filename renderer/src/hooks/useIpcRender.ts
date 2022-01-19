import { useEffect } from 'react';
import { MatexWin } from '../global';
import type { IpcRendererEvent } from 'electron';

interface IpcProps {
  channel: string;
  listener: (e: IpcRendererEvent) => void;
}

const useIpcOn = ({ channel, listener }: IpcProps) => {
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
