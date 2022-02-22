import { atom, useAtom } from 'jotai';
import { WebsocketType, WsMessage } from '/@/type/websocketPage';
import { produce } from 'immer';
import { checkIndex } from '/@/store/utils';
import { useUpdateAtom } from 'jotai/utils';

const testList: WsMessage[] = Array.from({ length: 10 }).map((_, index) => {
  return {
    index: index,
    type: index % 2 === 0 ? 'client' : 'server',
    message: index % 2 === 0 ? '你好啊' : '欢迎你',
    time: '2020-01-0' + index
  };
});

export const websocketTypeAtom = atom<WebsocketType>('native');
export const websocketSideAtom = atom<'client' | 'server'>('client');
export const websocketMsgListAtom = atom<WsMessage[]>(testList);
export const websocketNativeConnAtom = atom<WebSocket | undefined>(undefined);
export const websocketUrlAtom = atom<string>('ws://localhost:8080');

const addMsgListAtom = atom(null, (get, set, param: Omit<WsMessage, 'index'>) => {
  const tempList = produce(get<WsMessage[]>(websocketMsgListAtom), (draft) => {
    draft.push({ index: draft.length, ...param });
  });
  set(websocketMsgListAtom, checkIndex(tempList));
});

export const useMsgList = () => {
  const [msgList, updateMsgList] = useAtom(websocketMsgListAtom);
  const addMsgListFn = useUpdateAtom(addMsgListAtom);

  const clearList = () => {
    updateMsgList([]);
  };

  return {
    msgList,
    addMsg: addMsgListFn,
    clearList
  };
};
