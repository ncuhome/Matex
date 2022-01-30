import { GetReqParams } from './type';
import MatexReq from 'got';
import * as entities from 'entities';

export class RequestAction {
  static async doGet(props: GetReqParams) {
    const { url, headers, params } = props;
    console.log(params);
    const res = await MatexReq.get(url, {
      headers,
      searchParams: params
    });
    console.log(params);
    // MatexReq.post(url, {
    //   body: '1234',
    //   headers: {
    //     // ...headers,
    //     'Content-Type': 'text/plain'
    //   }
    // });
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
