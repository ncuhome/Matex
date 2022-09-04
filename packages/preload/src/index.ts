import { ipcRenderer, clipboard, contextBridge } from 'electron';
import type { NodeApiProps } from '../../common/global';
import {ApiTestReq} from "../../common/global";
import {IpcKey} from "../../common/globalKey";

const nodeApi: NodeApiProps = {
  nodeV: process.versions.node,
  chromeV: process.versions.chrome,
  electronV: process.versions.electron,
  NODE_ENV: process.env.NODE_ENV,
  Clipboard: clipboard,
  OS: process.platform === 'darwin' ? 'mac' : 'win',
  ipc: {
    sendReq: (args: ApiTestReq) => {
      ipcRenderer.invoke(IpcKey.ApiTestReq, args)
    },
    on: (args: any) => ipcRenderer.on('ipc', args)
  }
};

contextBridge.exposeInMainWorld('NodeApi', nodeApi);

console.log('preload--env:' + process.env.NODE_ENV);
