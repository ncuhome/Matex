import {BodyType, KVConfig, ReqType} from '/@/Model/ApiTest.model';
import {useAtomValue} from 'jotai';
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
import {ApiTestReq} from '/@common/global';

const useReqParams = () => {
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

export const getReqData = (method: ReqType): ApiTestReq => {
  const { url, headers, params, bodyType } = useReqParams();
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
        body: getBodyValue(bodyType)
      };
    case 'put':
      return {
        method: 'post',
        url,
        headers,
        bodyType,
        body: getBodyValue(bodyType)
      };
    case 'delete':
      return {
        method: 'post',
        url,
        headers,
        bodyType,
        body: getBodyValue(bodyType)
      };
    case 'header':
      return {
        method: 'post',
        url,
        headers,
        bodyType,
        body: getBodyValue(bodyType)
      };
  }
};

export const filterList = (list: KVConfig[]) => {
  const filteredList = list.filter((item) => {
    return item.selected && item.key && item.value;
  });

	return filteredList.map((item) => {
		return {key: item.key, value: item.value};
	});
};

const getBodyValue = (bodyType: BodyType) => {
  const { urlencodedValue, formDataValue, rawValue, binaryValue } = useReqParams();
  switch (bodyType) {
    case 'urlencoded':
      return urlencodedValue;
    case 'form-data':
      return formDataValue;
    case 'raw':
      return rawValue;
    case 'binary':
      return binaryValue[0].file.name;
  }
};
