import React, { useEffect } from 'react';
import { getPreviewSrc } from '/@cmp/PreviewResponse/utils';
import { useAtomValue } from 'jotai';
import { ResultAtom } from '/@/store/ApiTest/result.store';
import PreviewResponse from '/@cmp/PreviewResponse';
import { ApiTestRes, ExactRes } from '/@common/apiTest';

const Preview = () => {
  const res = useAtomValue(ResultAtom);
  if (!res) {
    return null;
  }
  const exactRes = (res as ApiTestRes).result as ExactRes;
  return <PreviewResponse src={getPreviewSrc(exactRes.body, exactRes.mimeType)} />;
};

export default Preview;
