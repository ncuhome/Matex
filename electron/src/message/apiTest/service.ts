import { GetReqParams } from './type';
import MatexReq from 'got';
import * as entities from 'entities';

export class RequestAction {
  static async doGet(params: GetReqParams) {
    const { url, headers } = params;
    const res = await MatexReq.get(url, headers);
    console.log(res.headers);
    if (res.headers['content-type']?.includes('text/html')) {
      return entities.encodeHTML5(res.body);
    } else {
      return res.body;
    }
  }

  // static async doPost(params: GetReqParams) {
  //   const { url, headers } = params;
  //   const res = await MatexReq.post(url, headers);
  //   console.log(res);
  //   return res;
  // }
}
