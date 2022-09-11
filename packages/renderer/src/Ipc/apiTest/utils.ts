import { BodyRawType, BodyType, KVConfig, ReqType } from '/@/Model/ApiTest.model';
import { useAtomValue } from 'jotai';
import {
  BinaryConfigs,
  FormDataConfigs,
  HeaderConfigs,
  ParamsConfigs,
  RawConfigValue,
  RawTypeValue,
  ReqBodyType,
  ReqUrl,
  UrlEncodeConfigs
} from '/@/store/ApiTest/config.store';
import type { ApiTestReq } from '/@common/apiTest';
import { FilePondFile } from 'filepond';
type KVData = Omit<KVConfig, 'selected' | 'opt'>;

interface FileKVData extends KVData {
  isFile?: boolean;
}

interface ReqParams {
  url: string;
  bodyType: BodyType;
  rawType: BodyRawType;
  headers: KVData[];
  params: KVData[];
  urlencodedValue: KVData[];
  formDataValue: KVData[];
  rawValue: string;
  binaryValue: FilePondFile[];
}

const useReqParams = (): ReqParams => {
  const url = useAtomValue(ReqUrl);
  const headers = useAtomValue(HeaderConfigs);
  const params = useAtomValue(ParamsConfigs);
  const bodyType = useAtomValue(ReqBodyType);
  const rawType = useAtomValue(RawTypeValue);
  const urlencodedValue = useAtomValue(UrlEncodeConfigs);
  const formDataValue = useAtomValue(FormDataConfigs);
  const rawValue = useAtomValue(RawConfigValue);
  const binaryValue = useAtomValue(BinaryConfigs);

  return {
    url,
    bodyType,
    rawType,
    headers: filterList(headers),
    params: filterList(params),
    urlencodedValue: filterList(urlencodedValue),
    formDataValue: filterList(formDataValue),
    rawValue,
    binaryValue
  };
};

export const useReqData = (method: ReqType): ApiTestReq => {
  const data = useReqParams();
  const { url, headers, params, bodyType } = data;
  switch (method) {
    case 'get':
      return {
        method: 'get',
        url,
        headers,
        params
      };
    case 'post':
      return {
        method: 'post',
        url,
        headers,
        bodyType,
        body: getBodyValue(bodyType, data)
      };
    case 'put':
      return {
        method: 'post',
        url,
        headers,
        bodyType,
        body: getBodyValue(bodyType, data)
      };
    case 'delete':
      return {
        method: 'post',
        url,
        headers,
        bodyType,
        body: getBodyValue(bodyType, data)
      };
    case 'header':
      return {
        method: 'post',
        url,
        headers,
        bodyType,
        body: getBodyValue(bodyType, data)
      };
  }
};

export const filterList = (list: KVConfig[]) => {
  const filteredList = list.filter((item) => {
    return item.selected && item.key && item.value;
  });

  return filteredList.map((item) => {
    return { key: item.key, value: item.value };
  });
};

const getBodyValue = (bodyType: BodyType, data: ReqParams) => {
  const { urlencodedValue, formDataValue, rawValue, binaryValue } = data;
  switch (bodyType) {
    case 'urlencoded':
      return urlencodedValue;
    case 'form-data':
      return handleFileForm(formDataValue);
    case 'raw':
      return rawValue;
    case 'binary':
      if (binaryValue.length) {
        console.log(binaryValue)
        return (binaryValue[0].file as any).path;
      }
      return '';
  }
};

const handleFileForm = (data: KVData[]) => {
  const temp: FileKVData[] = [];

  data.forEach((item) => {
    if (typeof item.value === 'object') {
      temp.push({ key: item.key, value: (item.value as any).path, isFile: true });
    } else {
      temp.push({ key: item.key, value: item.value });
    }
  });
  return temp;
};
