import { ApiTestRes } from '/@common/apiTest';

export const getPreviewSrc = (data: any, type: ApiTestRes['mimeType']) => {
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

  const renderImage = (res:any) => {
    const blob = new Blob([res], { type: 'image/png' });
    const url =  URL.createObjectURL(blob);
    return `<!DOCTYPE html><html lang="en"><head><title>text</title></head>
    <body>
    <img src="${url}" style="height: 210px">
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
  if (type.includes('image')){
    resData = renderImage(resData);
    mimeType = 'text/html';
  }

  const blob = new Blob([resData], { type: mimeType });
  return URL.createObjectURL(blob);
};
