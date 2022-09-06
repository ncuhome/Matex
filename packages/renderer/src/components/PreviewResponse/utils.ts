import { ApiTestRes } from '/@common/apiTest';
import {EditAble, previewAble} from "/@/pages/ApiTest/Result/Body/utils";

export const getPreviewSrc = (data: any, type: ApiTestRes['type']) => {
  const index = type.indexOf(';') > 0 ? type.indexOf(';') : type.length;
  let mimeType = type.slice(0, index);
  const renderJsonHtmlStr = (json: string) => {
    return `<!DOCTYPE html><html lang="en"><head><title>json</title></head>
    <body><pre style="word-wrap: break-word; white-space: pre-wrap;">${json}</pre>
    </body></html>`;
  };

  const renderTexStr = (text: string) => {
    return `<!DOCTYPE html><html lang="en"><head><title>text</title></head>
    <body><span style="word-wrap: break-word; white-space: pre-wrap;">${text}</span>
    </body></html>`;
  };

  let resData = data;
  if (type.includes('json')) {
    resData = renderJsonHtmlStr(resData);
    mimeType = 'text/html';
  }
  if (type.includes('text')) {
    resData = renderTexStr(resData);
    mimeType = 'text/html';
  }
  const blob = new Blob([resData], { type: mimeType });
  return URL.createObjectURL(blob);
};
