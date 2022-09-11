import { PostReqParams, GetReqParams } from '/@common/apiTest';
import { doGet } from './get';
import { doPost } from './post';
import { checkRes } from '../utils/checkRes';

export class RequestServers {
  static async Get(config: GetReqParams) {
    return checkRes(await doGet(config));
  }
  static async Post(config: PostReqParams) {
    return checkRes(await doPost(config));
  }
}
