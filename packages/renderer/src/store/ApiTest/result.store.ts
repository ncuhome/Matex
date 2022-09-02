//result Config
import { atom } from 'jotai';
import { ResDataType, ResDisplayType, ResFormatType } from '/@/Model/ApiTest.model';
import { ApiTestRes } from '/@common/global';

export const ResDataTypeAtom = atom<ResDataType>('响应数据');
export const ResDisplayTypeAtom = atom<ResDisplayType>('Pretty');
export const ResFormatTypeAtom = atom<ResFormatType>('text');
export const ResultAtom = atom<ApiTestRes | null>(null);
