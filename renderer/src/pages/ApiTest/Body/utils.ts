import { EditAble, OpenInBroAble } from '/@/utils/typeUtils';
import { ApiTestResProps } from '/@common/index';

export const isEditorAble = (typeStr: string) => {
  return EditAble.includes(typeStr);
};

export const isPreviewAble = (typeStr: string) => {
  return OpenInBroAble.includes(typeStr);
};

export const getPreviewSrc = (data: any, type: ApiTestResProps['type']) => {
  console.log(type);

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
  if (type === 'application/json') {
    resData = renderJsonHtmlStr(resData);
  }
  if (type === 'text/plain') {
    resData = renderTexStr(resData);
  }
  const blob = new Blob([resData], { type });
  return URL.createObjectURL(blob);
};
