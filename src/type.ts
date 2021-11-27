import type { IpcRenderer } from 'electron';

interface IpcWindow extends Window {
  ipc: IpcRenderer;
}

export const Window: IpcWindow = window as unknown as IpcWindow;
