import { useAtomValue } from 'jotai';
import { SelReqType } from '/@/store/ApiTest/config.store';
import { useReqData} from '/@/Ipc/apiTest/utils';
import { MatexWin } from '/@/Global/global';
import { useRef } from 'react';
import { emittery } from '/@/utils/instance';

export const useSendReq = () => {
  const method = useAtomValue(SelReqType);
  const sendData = useReqData(method);
  const listenerRef = useRef<boolean>(false);

  const sendReq = () => {
    MatexWin.NodeApi.ipc.sendApiTestReq(sendData);
    emittery.emit('Result-Status', 'Processing');
  };

  const onResponse = (callback: (e, args: any) => void) => {
    if (!listenerRef.current) {
      MatexWin.NodeApi.ipc.onApiTestRes((_e, _args) => {
        callback(_e, _args);
        emittery.emit('Result-Status', 'Result');
      });
      listenerRef.current = true;
    }
  };

  return {
    sendReq,
    onResponse
  };
};
