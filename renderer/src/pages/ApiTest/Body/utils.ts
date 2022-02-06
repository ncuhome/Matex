import { EditorAbleType } from '/@/utils/typeUtils';
import { ApiTestResProps } from '/@common/index';

export const identifyType = (typeStr: string) => {
  return EditorAbleType.includes(typeStr);
};

export const getPreviewSrc = (data: any, type: ApiTestResProps['type']) => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  console.log(url);
  return url;
};

export const getEncodedType = (typeStr: string) => {
  switch (typeStr) {
    case 'json':
      return 'application/json';
    case 'text':
      return 'text/plain';
    case 'html':
      return 'text/html';
    case 'xml':
      return 'text/xml';
    case 'javascript':
      return 'application/javascript';
    default:
      return 'text/plain';
  }
};
