import { atom, useAtom } from 'jotai';
import {
  ConfigType,
  DefaultHerderConfig,
  HerderConfig,
  ParamsConfig,
  ReqType,
  UrlEncodeConfig
} from '/@/Model/ApiTest.model';
import { atomWithImmer } from 'jotai/immer';
import { useEffect } from 'react';
import {getStore} from "/@/store/ApiTest/utils";

//Header Config
export const SelReq = atom<ReqType>('get');
export const ReqUrl = atom<string>('');
export const ReqConfigType = atom<ConfigType>('params');

export const HeaderConfigs = atomWithImmer<HerderConfig[]>(DefaultHerderConfig);
export const ParamsConfigs = atomWithImmer<ParamsConfig[]>([]);
export const UrlEncodeConfigs = atomWithImmer<ParamsConfig[]>([]);



export const useConfigList = <T extends HerderConfig>(type:ConfigType) => {
  const [configList, setConfigList] = useAtom(getStore(type));

  useEffect(() => {
    const len = configList.length;
    if (len===0||configList[len - 1].key.trim() !== '' || configList[len - 1].value.trim() !== '') {
      addConfig();
    }
  }, [configList]);

  const updateConfig = (index: number, type: 'key' | 'value', value: string) => {
    setConfigList((draft) => {
      draft[index][type] = value;
      return draft;
    });
  };

  const addConfig = () => {
    setConfigList((draft) => {
      draft.push({ key: '', value: '' });
      return draft;
    });
  };

  const deleteConfig = (index) => {
    setConfigList((draft) => {
      draft.splice(index, 1);
      return draft;
    });
  };

  // @ts-ignore
  return {
    configList,
    updateConfig,
    addConfig,
    deleteConfig
  }  ;
};
