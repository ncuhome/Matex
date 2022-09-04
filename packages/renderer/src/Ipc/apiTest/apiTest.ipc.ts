import { useAtomValue } from 'jotai';
import {
  SelReqType
} from '/@/store/ApiTest/config.store';
import { getReqData } from '/@/Ipc/apiTest/utils';
import { MatexWin } from '/@/Global/global';

export const useSendReq = () => {
  const method = useAtomValue(SelReqType);
  const sendData = getReqData(method);

  return () => {
    MatexWin.NodeApi.ipc.sendReq(sendData);
  };
};
