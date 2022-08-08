import { IpcRenderer } from "electron";

export interface NodeApiProps {
	NODE_ENV: 'development' | 'production' | string | undefined;
	ipc: IpcRenderer | null;
	OS: 'mac' | 'win';
	Clipboard: Electron.Clipboard;
}
