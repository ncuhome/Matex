import React, { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { ResDataTypeAtom, ResFormatTypeAtom, ResultAtom } from '/@/store/ApiTest/result.store';
import ReqError from '/@cmp/ReqError';
import { EditAble, previewAble } from '/@/pages/ApiTest/Result/Body/utils';
import ResultBodyEditor from '/@/pages/ApiTest/Result/Body/Editor';
import { LanguageMapper } from '/@cmp/MonacoEditor/utils';
import PreviewResponse from '/@cmp/PreviewResponse';
import { getPreviewSrc } from '/@cmp/PreviewResponse/utils';
import type { ResFormatType } from '/@/Model/ApiTest.model';
import { useUpdateAtom } from 'jotai/utils';
import CookieTable from '/@/pages/ApiTest/Result/Body/CookieTable';
import { ApiTestRes, ExactRes } from '/@common/apiTest';

const PrettyView = () => {
  const res = useAtomValue(ResultAtom);
  const resDataType = useAtomValue(ResDataTypeAtom);
  const setFormatType = useUpdateAtom(ResFormatTypeAtom);
  console.log(res);

  useEffect(() => {
    if (res && !res.isError) {
      setFormatType(res.result!.type as ResFormatType);
    }
  }, [res]);

  if (!res) {
    return null;
  }
  const _res = res as ApiTestRes;

  if (_res.isError) {
    return <ReqError />;
  }
  const exactRes = (res as ApiTestRes).result as ExactRes;
  if (resDataType === '响应数据') {
    if (EditAble.includes(exactRes.type)) {
      return (
        <ResultBodyEditor
          value={exactRes.body}
          language={LanguageMapper.get(exactRes.type) ?? 'text/plain'}
        />
      );
    } else if (previewAble.includes(exactRes.type)) {
      return <PreviewResponse src={getPreviewSrc(exactRes.body, exactRes.mimeType)} />;
    } else {
      return null;
    }
  } else if (resDataType === '响应头') {
    return <ResultBodyEditor value={JSON.stringify(exactRes.headers)} language={'json'} />;
  } else if (resDataType === 'Cookie') {
    return <CookieTable />;
  } else {
    return null;
  }
};

export default PrettyView;
