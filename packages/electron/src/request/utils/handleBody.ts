import { FileKVData, KVList, PostReqParams, ReqError } from '/@common/apiTest';
import { getParamsObj } from './reqHandle';
import fs from 'fs';
import matexhttp from 'matexhttp';

export interface HandleBodyRes {
  error?: ReqError;
  value?: matexhttp.CoreOptions;
}

export const handleBody = (props: PostReqParams): HandleBodyRes => {
  const { body, bodyType, rawType } = props;

  if (!body) {
    return {};
  }

  switch (bodyType) {
    case 'urlencoded': {
      const urlencoded = getParamsObj(body as KVList);
      return { value: { form: urlencoded } };
    }
    case 'form-data': {
      const formData = {};
      (body as FileKVData[]).forEach((item: FileKVData) => {
        if (item.isFile) {
          formData[item.key] = fs.createReadStream(item.value as string);
        } else {
          formData[item.key] = item.value;
        }
      });
      return { value: { formData } };
    }
    case 'raw': {
      const isJson = rawType === 'json';
      return { value: { json: isJson, body: isJson ? JSON.parse(body as string) : body } };
    }
    case 'binary': {
      if (body) {
        try {
          const data = fs.readFileSync(body as string);
          return { value: { body: data } };
        } catch (e: any) {
          const { stack, errno, code, syscall } = e;
          return {
            error: {
              type: 'fs',
              errorCode: code,
              desc: syscall
            }
          };
        }
      } else {
        return {};
      }
    }
  }
  return {};
};
