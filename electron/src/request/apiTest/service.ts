import { GetReqParams, PostReqParams } from './type';
import { ApiTestResProps, ReqError } from '../../../../common';
import { getResponse } from './utils/getResponse';
import { promisify } from 'util';
import matexhttp, { Response } from 'matexhttp';
import { handleBinary, handleFormData, handleRaw, handleUrlencoded } from './utils/handlePost';

const ReqAsync = promisify(matexhttp);

export class RequestAction {
  static async doGet(props: GetReqParams): Promise<ApiTestResProps | ReqError> {
    try {
      const { url, headers, params } = props;
      let response: Response;
      response = await ReqAsync({
        url,
        headers,
        timeout: 10000,
        time: true,
        method: 'GET',
        qs: params
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
  }

  static async doPost(props: PostReqParams): Promise<ApiTestResProps | ReqError> {
    const { type } = props;
    let response: ApiTestResProps | ReqError;

    switch (type) {
      case 'form-data':
        response = await handleFormData(props);
        break;
      case 'urlencoded':
        response = await handleUrlencoded(props);
        break;
      case 'raw':
        response = await handleRaw(props);
        break;
      case 'binary':
        response = await handleBinary(props);
        break;
      default:
        response = await handleFormData(props);
        break;
    }
    return response;
  }

  static async doPut(props: PostReqParams): Promise<ApiTestResProps | ReqError> {
    const { type } = props;
    let response: ApiTestResProps | ReqError;

    switch (type) {
      case 'form-data':
        response = await handleFormData(props, true);
        break;
      case 'urlencoded':
        response = await handleUrlencoded(props, true);
        break;
      case 'raw':
        response = await handleRaw(props, true);
        break;
      case 'binary':
        response = await handleBinary(props, true);
        break;
      default:
        response = await handleFormData(props, true);
        break;
    }
    return response;
  }
}
