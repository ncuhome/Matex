import React, { useEffect } from 'react';
import star from '/@/assets/icon/star.svg';
import styles from './index.module.scss';
import { Emitter } from '/@/utils/EventEmiter';
import { useAtomValue } from 'jotai/utils';
import { apiTestResDataAtom, apiTestBodyFormatAtom } from '/@/store/apiTestStore';
import MonacoEditor from '/@cmp/MonacoEditor';
import { LanguageMapper } from '/@cmp/MonacoEditor/utils';
import PreviewRes from '/@cmp/PreviewResponse';
import { getPreviewSrc, isEditorAble, isPreviewAble } from '/@/pages/ApiTest/Body/utils';
import { judgementType } from '/@/utils/typeUtils';
import { useUpdateEditorValue } from '/@/store/commonStore';

const Content = () => {
  const resData = useAtomValue(apiTestResDataAtom);
  const formatType = useAtomValue(apiTestBodyFormatAtom);
  const setEditorValue = useUpdateEditorValue('apiTest');

  useEffect(() => {
    if (resData) {
      Emitter.emit('monacoEditor-apiTest', resData.body);
      setEditorValue(resData.body);
    }
  }, [resData]);

  const render = () => {
    if (!resData) {
      return <img src={star} className={styles.idleImg} alt={'等待请求'} />;
    } else {
      const resType = judgementType(resData.type);
      if (!isEditorAble(resType)) {
        if (isPreviewAble(resType)) {
          return <PreviewRes src={getPreviewSrc(resData.body, resData.type)} />;
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
    }
  };
  return <>{render()}</>;
};

export default React.memo(Content);
