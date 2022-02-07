import React, { useEffect } from 'react';
import star from '/@/assets/icon/star.svg';
import styles from './index.module.scss';
import { myEmitter } from '/@/utils/EventEmiter';
import { useAtomValue } from 'jotai/utils';
import { apiTestResDataAtom, apiTestBodyFormatAtom } from '/@/store/apiTestStore';
import MonacoEditor from '/@cmp/MonacoEditor';
import { LanguageMapper } from '/@cmp/MonacoEditor/utils';
import Preview from '/@cmp/Preview';
import { getPreviewSrc, isEditorAble, isPreviewAble } from '/@/pages/ApiTest/Body/utils';
import { judgementType } from '/@/utils/typeUtils';

const Content = () => {
  const resData = useAtomValue(apiTestResDataAtom);
  const formatType = useAtomValue(apiTestBodyFormatAtom);
  useEffect(() => {
    if (resData) {
      myEmitter.emit('monacoEditor-apiTest', resData.body);
    }
  }, [resData]);

  if (!resData) {
    return <img src={star} className={styles.idleImg} alt={'等待请求'} />;
  } else {
    const resType = judgementType(resData.type);
    if (isEditorAble(resType)) {
      return (
        <MonacoEditor
          shadow={false}
          name={'apiTest'}
          language={LanguageMapper.get(formatType.toLowerCase())!}
          defaultVal={''}
          height={180}
          width={'100%'}
        />
      );
    } else {
      if (isPreviewAble(resType)) {
        return <Preview src={getPreviewSrc(resData.body, resData.type)} />;
      } else {
        return <div className={styles.noPreview}>无法预览</div>;
      }
    }
  }
};

export default React.memo(Content);
