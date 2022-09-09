import React, { useEffect } from 'react';
import { getPreviewSrc } from '/@cmp/PreviewResponse/utils';
import { useAtomValue } from 'jotai';
import { ResultAtom } from '/@/store/ApiTest/result.store';
import PreviewResponse from '/@cmp/PreviewResponse';

const Preview = () => {
  const res = useAtomValue(ResultAtom);
  if (!res) {
    return null;
  }

  return <PreviewResponse src={getPreviewSrc(res.body, res.mimeType)} />;
};

export default Preview;
