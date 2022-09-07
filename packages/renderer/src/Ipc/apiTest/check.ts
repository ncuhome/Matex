import validator from 'validator';
import type { ApiTestReq } from '/@common/apiTest';
import { toast } from 'react-toastify';
import React from "react";

const styles:React.CSSProperties={
  background:'var(--dark-color1)',
  color:'var(--light-text1)'
}

export const checkSendData = ({ url }: ApiTestReq) => {
  if (!url.trim()) {
    toast('URL 不能为空', { autoClose: 5000, type: 'error',style:styles });
    return false;
  } else {
    if (!validator.isURL(url)) {
      toast('URL 格式错误', { autoClose: 5000, type: 'error',style:styles });
      return false;
    } else {
      return  true;
    }
  }
};
