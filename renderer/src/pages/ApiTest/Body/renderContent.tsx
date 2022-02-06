import React, { useEffect } from 'react';
import star from '/@/assets/icon/star.svg';
import styles from './index.module.scss';
import { myEmitter } from '/@/utils/EventEmiter';
import { useAtomValue } from 'jotai/utils';
import { apiTestResDataAtom } from '/@/store/apiTestStore';
import MonacoEditor from '/@cmp/MonacoEditor';
import { LanguageMapper } from '/@cmp/MonacoEditor/utils';
import type { FormatType } from '/@/type/apiTest';
import Preview from '/@cmp/Preview';
import { getPreviewSrc } from '/@/pages/ApiTest/Body/utils';

const renderContent = (editAble: boolean, formatType: FormatType) => {
  const resData = useAtomValue(apiTestResDataAtom);
  console.log(resData);

  useEffect(() => {
    if (resData) {
      console.log('发送');
      myEmitter.emit('monacoEditor-apiTest', resData.body);
    }
  }, [resData]);

  if (!resData) {
    return <img src={star} className={styles.idleImg} alt={'等待请求'} />;
  } else {
    if (editAble) {
      console.log('11');
      return (
        <MonacoEditor
          shadow={false}
          name={'apiTest'}
          language={LanguageMapper.get(formatType.toLowerCase())!}
          defaultVal={''}
          height={185}
          width={'100%'}
        />
      );
    } else {
      return <Preview src={getPreviewSrc(resData.body, resData.type)} />;
    }
  }
};

export default renderContent;
