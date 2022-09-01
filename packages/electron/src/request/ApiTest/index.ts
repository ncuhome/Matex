import { ipcMain } from 'electron';
import { IpcKey } from '../../../../common/globalKey';
import {ApiTestReq, ApiTestRes} from '../../../../common/global';

export class ApiTestIpc {
	static _ev:Electron.IpcMainEvent|null=null

  static listenRequest() {
    ipcMain.on(IpcKey.ApiTestReq, (e, _req) => {
			ApiTestIpc._ev = e;
      const req = _req as ApiTestReq;
			console.log(req)
    });

  }

	static sendResponse(res:ApiTestRes){
		ApiTestIpc._ev?.reply(IpcKey.ApiTestRes,res)
	}
}
