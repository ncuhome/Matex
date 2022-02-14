import { GetReqParams, PostReqParams } from './type';
import { ApiTestResProps } from '../../../../common';
import { getResponse } from '../utils/getResponse';
import { promisify } from 'util';
import matexhttp, { Response } from 'matexhttp';

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
    const { url, headers, body } = props;

    const formData: { [key: string]: string } = {};
    body.forEach((item: any) => {
      formData[item.key] = item.value;
    });
    let response: Response;
    response = await ReqAsync({
      url,
      headers,
      method: 'POST',
      time: true,
      formData: formData
    });
    return getResponse(response);
  }
}
