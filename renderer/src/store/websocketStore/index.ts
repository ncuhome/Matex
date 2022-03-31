import { atom, useAtom } from 'jotai';
import { WebsocketType, WsMessage, WsSocketIo } from '/@/type/websocketPage';
import { produce } from 'immer';
import { checkIndex } from '/@/store/utils';
import { useUpdateAtom } from 'jotai/utils';

export const websocketTypeAtom = atom<WebsocketType>('socket io');
export const websocketSideAtom = atom<'client' | 'server'>('client');
export const websocketMsgListAtom = atom<WsMessage[]>([]);
export const websocketConnAtom = atom<WebSocket | undefined>(undefined);
export const socketIoConnAtom = atom<WsSocketIo | undefined>(undefined);
export const websocketUrlAtom = atom<string>('ws://localhost:8000');
export const socketIoChannelsAtom = atom<string[]>(['message']);
export const socketIoSendChannelAtom = atom<string>('');

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

const addChannelAtom = atom(null, (get, set, channel: string) => {
  const tempList = produce(get<string[]>(socketIoChannelsAtom), (draft) => {
    draft.push(channel);
  });
  set(socketIoChannelsAtom, tempList);
});

const updateChannelAtom = atom(null, (get, set, props: { index: number; channel: string }) => {
  const tempList = produce(get<string[]>(socketIoChannelsAtom), (draft) => {
    draft.splice(props.index, 1, props.channel);
  });
  set(socketIoChannelsAtom, tempList);
});

export const useSocketIoChannels = () => {
  const [channels, updateChannel] = useAtom(socketIoChannelsAtom);
  const addChannel = useUpdateAtom(addChannelAtom);
  const changeChannelContent = useUpdateAtom(updateChannelAtom);

  const clearChannels = () => {
    updateChannel([]);
  };

  const changeChannel = (index: number, channel: string) => {
    changeChannelContent({ index, channel });
  };

  return {
    channels,
    changeChannel,
    addChannel: addChannel,
    clearChannels
  };
};
