import React from 'react';
import type { ApiTestRes } from '/@common/apiTest';
import { useAtomValue } from 'jotai';
import { ResultAtom } from '/@/store/ApiTest/result.store';
import ReqError from '/@cmp/ReqError';
import {EditAble, previewAble} from '/@/pages/ApiTest/Result/Body/utils';
import ResultBodyEditor from '/@/pages/ApiTest/Result/Body/Editor';
import { LanguageMapper } from '/@cmp/MonacoEditor/utils';

const PrettyView = () => {
  const res = useAtomValue(ResultAtom);
  if (!res) {
    return null;
  } else {
    if (res.type === 'error') {
      return <ReqError />;
    } else if (EditAble.includes(res.type)) {
      return <ResultBodyEditor value={res.body} language={LanguageMapper.get(res.type) ?? 'text/plain'} />;
    } else if (previewAble){
			return null
		}
  }
};

export default PrettyView;
