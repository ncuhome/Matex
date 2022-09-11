import { FileKVData, KVList, PostReqParams } from '/@common/apiTest';
import { getParamsObj } from './reqHandle';
import fs from 'fs';
import matexhttp from 'matexhttp';

export const handleBody = (props: PostReqParams): matexhttp.CoreOptions => {
  const { body, bodyType, rawType } = props;

  if (!body) {
    return {};
  }

  switch (bodyType) {
    case 'urlencoded': {
      const urlencoded = getParamsObj(body as KVList);
      return { form: urlencoded };
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
      return { formData };
    }
    case 'raw': {
      const isJson = rawType === 'json';
      return { json: isJson, body: isJson ? JSON.parse(body as string) : body };
    }
    case 'binary': {
      if (body) {
        try {
          const data = fs.readFileSync(body as string);
          return { body: data };
        } catch (e) {
          console.log(e)
        }
      } else {
        return {};
      }
    }
  }
  return {};
};
