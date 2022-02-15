import toast from 'react-hot-toast';

export const checkUrl = (url: string) => {
  const urlRegex = new RegExp(/^http(s)?:\/\/(.)*$/);
  let res;
  if (url === '') {
    toast.error('url不能为空');
    res = false;
  } else if (!urlRegex.test(url)) {
    toast.error('url格式错误');
    res = false;
  } else {
    res = true;
  }
  return res;
};

export const checkBody = () => {};
