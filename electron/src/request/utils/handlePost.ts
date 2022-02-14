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
