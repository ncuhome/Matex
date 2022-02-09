import React, { useEffect, useState } from 'react';
import star from '/@/assets/icon/star.svg';
import styles from './index.module.scss';
import { Emitter } from '/@/utils/EventEmiter';
import { useAtomValue } from 'jotai/utils';
import { apiTestResDataAtom, apiTestBodyFormatAtom, apiTestBodyActionAtom } from '/@/store/apiTestStore';
import MonacoEditor from '/@cmp/MonacoEditor';
import { LanguageMapper } from '/@cmp/MonacoEditor/utils';
import PreviewRes from '/@cmp/PreviewResponse';
import {
  getPreviewJsonSrc,
  getPreviewSrc,
  isEditorAble,
  isPreviewAble,
  renderJsonHtmlStr
} from '/@/pages/ApiTest/Body/utils';
import { judgementType } from '/@/utils/typeUtils';
import { useUpdateEditorValue } from '/@/store/commonStore';

const Content = () => {
  const resData = useAtomValue(apiTestResDataAtom);
  const formatType = useAtomValue(apiTestBodyFormatAtom);
  const bodyAction = useAtomValue(apiTestBodyActionAtom);
  const setEditorValue = useUpdateEditorValue('apiTest');

  useEffect(() => {
    if (resData) {
      Emitter.emit('monacoEditor-apiTest', resData.body);
      setEditorValue(resData.body);
    }
  }, [resData]);

  const render = () => {
    const resType = judgementType(resData!.type);
    if (!isEditorAble(resType)) {
      if (isPreviewAble(resType)) {
        return <PreviewRes src={getPreviewSrc(resData!.body, resData!.type)} />;
      } else {
        return <div>无法预览</div>;
      }
    } else {
      return (
        <MonacoEditor
          onChange={(changes, value) => {
            setEditorValue(value ?? '');
          }}
          shadow={false}
          name={'apiTest'}
          language={LanguageMapper.get(formatType.toLowerCase())!}
          defaultVal={''}
          height={230}
          width={'100%'}
        />
      );
    }
  };
  if (!resData) {
    return <img src={star} className={styles.idleImg} alt={'等待请求'} />;
  } else {
    if (bodyAction === 'Pretty') {
      return <>{render()}</>;
    } else {
      return <PreviewRes src={getPreviewJsonSrc(resData.body)} />;
    }
  }
};

export default React.memo(Content);
