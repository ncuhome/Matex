import { KVList } from '/@common/apiTest';

export const getParamsObj = (list: KVList): { [key: string]: string } => {
  let _obj = {};
  if (list.length === 0) {
    _obj = {};
  }
  list.forEach((item) => {
    _obj = Object.assign(_obj, {
      [item.key]: item.value
    });
  });
  return _obj;
};
