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

const PrettyView = () => {
  const res = useAtomValue(ResultAtom);
  const resDataType = useAtomValue(ResDataTypeAtom);
  const setFormatType = useUpdateAtom(ResFormatTypeAtom);
  console.log(res);
  useEffect(() => {
    if (res && res.type !== 'error') {
      setFormatType(res.type as ResFormatType);
    }
  }, [res]);

  if (!res) {
    return null;
  }
  if (resDataType === '响应数据') {
    if (res.type === 'error') {
      return <ReqError type={'reqError'} />;
    } else if (!res.success) {
      return <ReqError type={'resError'} msg={res.statusMassage} statusCode={res.statusCode} />;
    } else if (EditAble.includes(res.type)) {
      return <ResultBodyEditor value={res.body} language={LanguageMapper.get(res.type) ?? 'text/plain'} />;
    } else if (previewAble.includes(res.type)) {
      return <PreviewResponse src={getPreviewSrc(res.body, res.mimeType)} />;
    } else {
      return null;
    }
  } else if (resDataType === '响应头') {
    return <ResultBodyEditor value={JSON.stringify(res.headers)} language={'json'} />;
  } else if (resDataType === 'Cookie') {
    return <CookieTable />;
  } else {
    return null;
  }
};

export default PrettyView;
