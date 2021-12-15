import type { IpcRenderer } from 'electron';
import type { AxiosStatic } from 'axios';

interface MatexWindow extends Window {
  ipc: IpcRenderer;
  Mixos: AxiosStatic;
}

export const Window: MatexWindow = window as unknown as MatexWindow;
