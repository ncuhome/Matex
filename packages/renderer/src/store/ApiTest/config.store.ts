import { atom, useAtom } from 'jotai';
import {
  BodyRawType,
  BodyType,
  ConfigType,
  DefaultHerderConfig,
  KVConfig,
  ReqType,
  ResDataType,
  ResDisplayType,
  ResFormatType
} from '/@/Model/ApiTest.model';
import { atomWithImmer } from 'jotai/immer';
import { useEffect } from 'react';
import { getStore } from '/@/store/ApiTest/utils';
import type { FilePondFile } from 'filepond';
import { nanoid } from 'nanoid';
import {valueType} from "/@cmp/Table";

//Header Config
export const SelReqType = atom<ReqType>('get');
export const ReqUrl = atom<string>('');
export const ReqConfigType = atom<ConfigType>('params');
export const ReqBodyType = atom<BodyType>('urlencoded');
export const RawTypeValue = atom<BodyRawType>('text');

export const HeaderConfigs = atomWithImmer<KVConfig[]>(DefaultHerderConfig);
export const ParamsConfigs = atomWithImmer<KVConfig[]>([]);
export const UrlEncodeConfigs = atomWithImmer<KVConfig[]>([]);
export const FormDataConfigs = atomWithImmer<KVConfig[]>([]);
export const RawConfigValue = atomWithImmer<string>('');
export const BinaryConfigs = atomWithImmer<FilePondFile[]>([]);

export const useConfigList = (configType: ConfigType, bodyType: Exclude<BodyType, 'raw' | 'binary'>) => {
  const [configList, setConfigList] = useAtom(getStore(configType, bodyType));

  useEffect(() => {
    const len = configList.length;
    if (len === 0 || configList[len - 1].key.trim() !== '' || configList[len - 1].value) {
      addConfig();
    }
  }, [configList]);

  const updateConfig = (index: number, type: valueType, value: KVConfig['value']|boolean) => {
    setConfigList((draft) => {
      if (type === 'key') {
        draft[index].key = value as string;
      } else if (type==='value'){
        draft[index].value = value as KVConfig['value'];
      } else {
        draft[index].selected = value as KVConfig['selected'];
      }
      return draft;
    });
  };

  const addConfig = () => {
    setConfigList((draft) => {
      draft.push({ id: nanoid(), selected: true, key: '', value: '', opt: '' });
      return draft;
    });
  };

  const deleteConfig = (index) => {
    setConfigList((draft) => {
      draft.splice(index, 1);
      return draft;
    });
  };

  return {
    configList,
    updateConfig,
    addConfig,
    deleteConfig
  };
};
