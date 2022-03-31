interface StatusObj {
  text: string;
  color: string;
}

export const getStatusColor = (status: string) => {
  let res: StatusObj = { text: '', color: '' };
  switch (status) {
    case '连接中':
      res = {
        text: 'connecting',
        color: '#F8AD7C'
      };
      break;
    case '已连接':
      res = {
        text: 'connected',
        color: '#3FDA0D'
      };
      break;
    case '关闭中':
      res = {
        text: 'closing',
        color: '#E5E5E5'
      };
      break;
    case '未连接':
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
      return '连接中';
    case 1:
      return '已连接';
    case 2:
      return '关闭中';
    case 3:
      return '未连接';
    default:
      return '未连接';
  }
};
