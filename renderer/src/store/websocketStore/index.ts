import { atom, useAtom } from 'jotai';
import type { WebsocketType, WsMessage, WsSocketIo } from '/@/type/websocketPage';
import { produce } from 'immer';
import { checkIndex } from '/@/store/utils';
import { useUpdateAtom } from 'jotai/utils';
import type { StartBtnProps } from '/@/pages/WebSocket/MsgWin/Footer/StartBtn';
import { ChannelStatus, ExternalWsConfig } from '/@/type/websocketPage';

export const websocketTypeAtom = atom<WebsocketType>('socket io');
export const websocketSideAtom = atom<'client' | 'server'>('client');
export const websocketMsgListAtom = atom<WsMessage[]>([]);
export const websocketConnAtom = atom<WebSocket | undefined>(undefined);
export const socketIoConnAtom = atom<WsSocketIo | undefined>(undefined);
export const websocketUrlAtom = atom<string>('');
export const socketIoChannelsAtom = atom<ChannelStatus[]>([{ val: 'message', listen: true }]);
export const socketIoSendChannelAtom = atom<string>('');
export const StartBtnAtom = atom<Pick<StartBtnProps, 'status' | 'text'>>({ text: '启动', status: 'normal' });
export const externalWsAtom = atom<ExternalWsConfig>({
  binaryType: 'arraybuffer',
  protocols:''
});

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
  const tempList = produce(get<ChannelStatus[]>(socketIoChannelsAtom), (draft) => {
    draft.push({ val: channel, listen: false });
  });
  set(socketIoChannelsAtom, tempList);
});

const deleteChannelAtom = atom(null, (get, set, index: number) => {
  const tempList = produce(get<ChannelStatus[]>(socketIoChannelsAtom), (draft) => {
    draft.splice(index, 1);
  });
  set(socketIoChannelsAtom, tempList);
});

const updateChannelAtom = atom(null, (get, set, props: { index: number; channel: string }) => {
  const tempList = produce(get<ChannelStatus[]>(socketIoChannelsAtom), (draft) => {
    draft[props.index].val = props.channel;
  });
  console.log(tempList);
  set(socketIoChannelsAtom, tempList);
});

const listenChannelAtom = atom(null, (get, set, index: number) => {
  const tempList = produce(get<ChannelStatus[]>(socketIoChannelsAtom), (draft) => {
    if (draft[index].val.trim().length !== 0) {
      draft.splice(index, 1, { val: draft[index].val, listen: true });
    }
  });
  set(socketIoChannelsAtom, tempList);
});

export const useSocketIoChannels = () => {
  const [channels, updateChannel] = useAtom(socketIoChannelsAtom);
  const addChannel = useUpdateAtom(addChannelAtom);
  const deleteChannel = useUpdateAtom(deleteChannelAtom);
  const listenChannel = useUpdateAtom(listenChannelAtom);

  const clearChannels = () => {
    updateChannel([]);
  };

  const changeChannel = (index: number, channel: string) => {
    const tempList = produce(channels, (draft) => {
      draft[index].val = channel;
    });
    updateChannel(tempList);
  };

  return {
    channels,
    changeChannel,
    addChannel,
    deleteChannel,
    listenChannel,
    clearChannels
  };
};
