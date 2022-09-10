import { GetReqParams, KVList } from '/@common/apiTest';
import type { AuthType, AuthValueType } from '../../../../renderer/src/Model/ApiTest.model';
import matexhttp from 'matexhttp';

export const getParamsObj = (list: KVList): { [key: string]: string } => {
  let _obj = {};
  if (list.length === 0) {
    _obj = {};
  }
  list.forEach((item) => {
    _obj = Object.assign(_obj, {
      [item.key]: item.value
    });
  });
  return _obj;
};

export const getReqOptions = (props: GetReqParams): Partial<matexhttp.CoreOptions> => {
  const { params, headers, auth } = props;
  const paramObj = getParamsObj(params as KVList);
  const headerObj = getParamsObj(headers as KVList);
  const commonOptions = { headers: headerObj, qs: paramObj };
  const _auth = auth as { type: AuthType; value: AuthValueType };

  if (_auth.type === 'ApiKey') {
    const _obj = _auth.value.ApiKey;
    if (_auth.value.ApiKey.addTo === 'header') {
      const _headers = Object.assign(headerObj, { [_obj.key]: _obj.value });
      return { headers: _headers, qs: paramObj };
    } else {
      const _params = Object.assign(paramObj, { [_obj.key]: _obj.value });
      return { headers: headerObj, qs: _params };
    }
  }
  if (_auth.type === 'Bearer') {
    const _obj = _auth.value.Bearer;
    return Object.assign(commonOptions, {
      auth: {
        bearer: _obj
      }
    });
  }
  if (_auth.type === 'Basic') {
    const _obj = _auth.value.Basic;
    return Object.assign(commonOptions, {
      auth: {
        username: _obj.username,
        password: _obj.password
      }
    });
  }

  if (_auth.type === 'Digest') {
    const _obj = _auth.value.Basic;
    return Object.assign(commonOptions, {
      auth: {
        username: _obj.username,
        password: _obj.password,
        sendImmediately: false
      }
    });
  }

  return commonOptions;
};
