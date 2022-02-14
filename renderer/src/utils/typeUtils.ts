import type { BodyItemType } from '/@/type/apiTest';

export const EditAble = ['json', 'text', 'html', 'xml', 'javascript'];
export const OpenInBroAble = ['image', 'audio', 'video', 'pdf'];
export const EditAndPreviewAble = ['json', 'html', 'text'];

export const judgementType = (typeStr: string) => {
  if (typeStr.includes('text/html')) {
    return 'html';
  } else if (typeStr.includes('text/plain')) {
    return 'text';
  } else if (typeStr.includes('application/xml')) {
    return 'xml';
  } else if (typeStr.includes('image/')) {
    return 'image';
  } else if (typeStr.includes('audio/')) {
    return 'audio';
  } else if (typeStr.includes('video/')) {
    return 'video';
  } else if (typeStr.includes('application/json')) {
    return 'json';
  } else if (typeStr.includes('application/pdf')) {
    return 'pdf';
  } else if (typeStr.includes('application/msword')) {
    return 'word';
  } else {
    return 'unknown';
  }
};

export const ContentTypeMapping = new Map<BodyItemType, string>([
  ['form-data', 'multipart/form-data'],
  ['urlencoded', 'application/x-www-form-urlencoded']
]);
