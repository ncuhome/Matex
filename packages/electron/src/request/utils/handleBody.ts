import { FileKVData, KVList, PostReqParams, ReqError } from '/@common/apiTest';
import { getParamsObj } from './reqHandle';
import fs from 'fs';
import matexhttp from 'matexhttp';
import {VError} from 'verror'

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
          try {
            formData[item.key] = fs.createReadStream(item.value as string);
          } catch (e:any) {
            const { code } = e;
            const err = new VError(e, 'read "%s"',item.value);
            console.log(e)
            return {
              error: {
                type: 'fs',
                errorCode: code,
                desc: err.message
              }
            };
          }
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
          const { code } = e;
          const err = new VError(e, 'read "%s"',body);
          console.log(e)
          return {
            error: {
              type: 'fs',
              errorCode: code,
              desc: err.message
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
