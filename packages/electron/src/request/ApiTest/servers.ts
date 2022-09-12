import { PostReqParams, GetReqParams } from '/@common/apiTest';
import { doGet } from './get';
import { doPost } from './post';
import { checkRes } from '../utils/checkRes';
import { doPut } from './put';
import { doDelete } from './delete';
import {doHead} from "./head";

export class RequestServers {
  static async Get(config: GetReqParams) {
    return checkRes(await doGet(config));
  }
  static async Post(config: PostReqParams) {
    return checkRes(await doPost(config));
  }
  static async Put(config: PostReqParams) {
    return checkRes(await doPut(config));
  }
  static async Delete(config: GetReqParams) {
    return checkRes(await doDelete(config));
  }
  static async Head(config: GetReqParams) {
    return checkRes(await doHead(config));
  }
}
