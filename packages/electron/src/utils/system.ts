import os from 'os';

export const getOsType = () => {
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
