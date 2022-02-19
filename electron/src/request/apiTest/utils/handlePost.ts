import { PostReqParams } from '../type';
import {ApiTestResProps, ReqError} from '../../../../../common';
import matexhttp, { Response } from 'matexhttp';
import * as fs from 'fs';
import { promisify } from 'util';
import { getResponse } from './getResponse';

const ReqAsync = promisify(matexhttp);

export const handleFormData = async (
  props: PostReqParams,
  put: boolean = false
): Promise<ApiTestResProps | ReqError> => {
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

    try {
      response = await ReqAsync({
        url,
        headers,
        method: put ? 'PUT' : 'POST',
        time: true,
        formData: form
      });
      return getResponse(response);
    } catch (e: any) {
      console.log(e);
      const { stack, errno, code, syscall, address, port } = e;
      return {
        type: 'error',
        errno,
        code,
        syscall,
        address,
        port,
        stack
      };
    }
  } else {
    throw new Error('请求体不能为空');
  }
};

export const handleUrlencoded = async (
  props: PostReqParams,
  put: boolean = false
): Promise<ApiTestResProps | ReqError> => {
  const { body, url, headers } = props;
  let response: Response;
  if (body) {
    const { urlencoded } = body;

    try {
      response = await ReqAsync({
        url,
        headers,
        method: put ? 'PUT' : 'POST',
        time: true,
        form: urlencoded
      });
      return getResponse(response);
    } catch (e: any) {
      console.log(e);
      const { stack, errno, code, syscall, address, port } = e;
      return {
        type: 'error',
        errno,
        code,
        syscall,
        address,
        port,
        stack
      };
    }
  } else {
    throw new Error('请求体不能为空');
  }
};

export const handleRaw = async (props: PostReqParams, put: boolean = false): Promise<ApiTestResProps | ReqError> => {
  const { body, url, headers, rawType } = props;
  let response: Response;
  if (body) {
    const { rawValue } = body;
    const isJson = rawType === 'json';
    try {
      response = await ReqAsync({
        url,
        headers,
        method: put ? 'PUT' : 'POST',
        time: true,
        json: isJson,
        body: isJson ? JSON.parse(rawValue as string) : rawValue
      });
      return getResponse(response);
    } catch (e: any) {
      console.log(e);
      const { stack, errno, code, syscall, address, port } = e;
      return {
        type: 'error',
        errno,
        code,
        syscall,
        address,
        port,
        stack
      };
    }
  } else {
    throw new Error('请求体不能为空');
  }
};

export const handleBinary = async (props: PostReqParams, put: boolean = false): Promise<ApiTestResProps | ReqError> => {
  const { body, url, headers } = props;
  let response: Response;
  if (body) {
    const { binary } = body;
    try {
      response = await ReqAsync({
        url,
        headers,
        method: put ? 'PUT' : 'POST',
        time: true,
        body: fs.readFileSync(binary!)
      });
      return getResponse(response);
    } catch (e: any) {
      console.log(e);
      const { stack, errno, code, syscall, address, port } = e;
      return {
        type: 'error',
        errno,
        code,
        syscall,
        address,
        port,
        stack
      };
    }
  } else {
    throw new Error('请求体不能为空');
  }
};
