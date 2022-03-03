import os from 'os';
import { MatexLog } from '../core/log';

export const getOsType = () => {
  MatexLog.debug(os.type());
  let type: 'win' | 'mac' | 'other';

  switch (os.platform()) {
    case 'darwin':
      type = 'mac';
      break;
    case 'win32':
      type = 'win';
      break;
    default:
      type = 'other';
      break;
  }
  return type;
};
