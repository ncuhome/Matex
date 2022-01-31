import { GetReqParams } from './type';
import MatexReq from 'got';
import * as entities from 'entities';
import { judgementType } from '../../utils/judgement';
import { ApiTestResProps } from '../../../../common';
import { getDescription } from '../../utils/statusCodeMapping';

export class RequestAction {
  static async doGet(props: GetReqParams): Promise<ApiTestResProps> {
    const { url, headers, params } = props;
    const res = await MatexReq.get(url, {
      headers,
      searchParams: params
    });
    const type = judgementType(res.headers['content-type'] ?? 'text/plain');
    return {
      type,
      desc: getDescription(res.statusCode),
      statusCode: res.statusCode,
      body: res.body,
      headers: res.headers,
      timer: res.timings.phases
    };
  }
}
