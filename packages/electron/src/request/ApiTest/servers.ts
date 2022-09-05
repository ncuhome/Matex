import { GetReqParams } from '/@common/apiTest';
import { doGet } from './get';

export class RequestServers {
  static async Get(config: GetReqParams) {
    return await doGet(config);
  }
}
