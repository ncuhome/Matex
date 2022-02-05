import { GetReqParams } from './type';
import MatexReq, { Response } from 'got';
import { ApiTestResProps } from '../../../../common';
import { getResponse } from '../utils/getResponse';

export class RequestAction {
  static async doGet(props: GetReqParams): Promise<ApiTestResProps> {
    const { url, headers, params } = props;
    let response: Response<string>;
    try {
      response = await MatexReq.get(url, {
        headers,
        searchParams: params
      });
    } catch (e: any) {
      response = e.response;
    }
    return getResponse(response);
  }
}
