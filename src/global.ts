import type { IpcRenderer } from 'electron';
import type { AxiosStatic } from 'axios';

interface MatexWindow extends Window {
  ipc: IpcRenderer | null;
  Mixos: AxiosStatic;
  decodeHTML5: (str: string | any[]) => string;
}

export const MatexWin: MatexWindow = window as unknown as MatexWindow;
