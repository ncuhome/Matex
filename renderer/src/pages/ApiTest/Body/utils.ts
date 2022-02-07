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
