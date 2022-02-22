interface StatusObj {
  text: string;
  color: string;
}

export const getConnStatus = (status: string) => {
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
        color: 'green'
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
        color: 'black'
      };
      break;
  }
  return res;
};
