import { atom, useAtom } from 'jotai';
import { WebsocketType, WsMessage } from '/@/type/websocketPage';
import { produce } from 'immer';

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

export const useMsgList = () => {
  const [msgList, updateMsgList] = useAtom(websocketMsgListAtom);

  const addMsg = (msg: Omit<WsMessage, 'index'>) => {
    const tempList = produce(msgList, (draft) => {
      draft.push({ index: draft.length, ...msg });
    });
    updateMsgList(tempList);
  };

  const clearList = () => {
    updateMsgList([]);
  };

  return {
    msgList,
    addMsg,
    clearList
  };
};
