import os from 'os';
import { MatexLog } from '../scripts/log';

export const getSystemOs = () => {
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
