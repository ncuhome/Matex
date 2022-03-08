interface StatusObj {
  text: string;
  color: string;
}

export const getStatusColor = (status: string) => {
  let res: StatusObj = { text: '', color: '' };
  switch (status) {
    case 'connecting':
      res = {
        text: 'connecting',
        color: '#F8AD7C'
      };
      break;
    case 'connected':
      res = {
        text: 'connected',
        color: '#3FDA0D'
      };
      break;
    case 'closing':
      res = {
        text: 'closing',
        color: '#E5E5E5'
      };
      break;
    case 'closed':
      res = {
        text: 'closed',
        color: '#BAC3D6'
      };
      break;
  }
  return res;
};

export const getStatusText = (code: number) => {
  switch (code) {
    case 0:
      return 'connecting';
    case 1:
      return 'connected';
    case 2:
      return 'closing';
    case 3:
      return 'closed';
    default:
      return 'closed';
  }
};
