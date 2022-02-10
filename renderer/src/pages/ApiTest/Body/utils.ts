import { EditorAbleType, PreviewAble } from '/@/utils/typeUtils';
import { ApiTestResProps } from '/@common/index';

export const isEditorAble = (typeStr: string) => {
  return EditorAbleType.includes(typeStr);
};

export const isPreviewAble = (typeStr: string) => {
  return PreviewAble.includes(typeStr);
};

export const getPreviewSrc = (data: any, type: ApiTestResProps['type']) => {
  const blob = new Blob([data], { type });
  return URL.createObjectURL(blob);
};
export const getPreviewJsonSrc = (json: string) => {
  const renderJsonHtmlStr = (json: string) => {
    return `<!DOCTYPE html><html lang="en"><head><title>json</title></head>
    <body><pre style="word-wrap: break-word; white-space: pre-wrap;">${json}</pre>
    </body></html>`;
  };
  return getPreviewSrc(renderJsonHtmlStr(json), 'text/html');
};
