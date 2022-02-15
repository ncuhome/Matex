import { PostReqParams } from '../apiTest/type';
import { ApiTestResProps } from '../../../../common';
import matexhttp, { Response } from 'matexhttp';
import * as fs from 'fs';
import { promisify } from 'util';
import { getResponse } from './getResponse';

const ReqAsync = promisify(matexhttp);

export const handleFormData = async (props: PostReqParams): Promise<ApiTestResProps> => {
  const { body, url, headers } = props;
  let response: Response;
  if (body) {
    const { formData } = body;
    const form: { [key: string]: any } = {};
    formData?.forEach((item: any) => {
      if (item.isFile) {
        form[item.key] = fs.createReadStream(item.value);
      } else {
        form[item.key] = item.value;
      }
    });
    response = await ReqAsync({
      url,
      headers,
      method: 'POST',
      time: true,
      formData: form
    });
    return getResponse(response);
  } else {
    throw new Error('请求体不能为空');
  }
};

export const handleUrlencoded = async (props: PostReqParams): Promise<ApiTestResProps> => {
  const { body, url, headers } = props;
  let response: Response;
  if (body) {
    const { urlencoded } = body;
    response = await ReqAsync({
      url,
      headers,
      method: 'POST',
      time: true,
      form: urlencoded
    });
    return getResponse(response);
  } else {
    throw new Error('请求体不能为空');
  }
};

export const handleRaw = async (props: PostReqParams): Promise<ApiTestResProps> => {
  const { body, url, headers, rawType } = props;
  let response: Response;
  if (body) {
    const { rawValue } = body;
    const isJson = rawType === 'json';
    console.log(headers);
    console.log(rawType);
    console.log(isJson);
    response = await ReqAsync({
      url,
      headers,
      method: 'POST',
      time: true,
      json: isJson,
      body: isJson ? JSON.parse(rawValue as string) : rawValue
    });
    return getResponse(response);
  } else {
    throw new Error('请求体不能为空');
  }
};

export const handleBinary = async (props: PostReqParams): Promise<ApiTestResProps> => {
  const { body, url, headers } = props;
  let response: Response;
  if (body) {
    const { binary } = body;
    response = await ReqAsync({
      url,
      headers,
      method: 'POST',
      time: true,
      body: fs.readFileSync(binary!)
    });
    return getResponse(response);
  } else {
    throw new Error('请求体不能为空');
  }
};
