import { atom } from 'jotai'
import {ConfigType, DefaultHerderConfig, HerderConfig, ReqType} from "/@/Model/ApiTest.model";

//Header Config
export const SelReq = atom<ReqType>('get');
export const ReqUrl = atom<string>('');
export const SelConfig = atom<ConfigType>('header');

export const HeaderConfigs = atom<HerderConfig[]>(DefaultHerderConfig)
