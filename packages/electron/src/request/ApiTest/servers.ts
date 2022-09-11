import { PostReqParams, GetReqParams } from '/@common/apiTest';
import { doGet } from './get';
import { doPost } from './post';

export class RequestServers {
  static async Get(config: GetReqParams) {
    return await doGet(config);
  }
  static async Post(config: PostReqParams) {
    return await doPost(config);
  }
}
