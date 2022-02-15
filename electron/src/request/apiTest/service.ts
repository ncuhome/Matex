import { GetReqParams, PostReqParams } from './type';
import { ApiTestResProps } from '../../../../common';
import { getResponse } from '../utils/getResponse';
import { promisify } from 'util';
import matexhttp, { Response } from 'matexhttp';
import { handleBinary, handleFormData, handleRaw, handleUrlencoded } from '../utils/handlePost';

const ReqAsync = promisify(matexhttp);

export class RequestAction {
  static async doGet(props: GetReqParams): Promise<ApiTestResProps> {
    const { url, headers, params } = props;
    let response: Response;
    response = await ReqAsync({
      url,
      headers,
      time: true,
      method: 'GET',
      qs: params
    });
    return getResponse(response);
  }

  static async doPost(props: PostReqParams): Promise<ApiTestResProps> {
    console.log(props);
    const { type } = props;
    let response: ApiTestResProps;

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
}
