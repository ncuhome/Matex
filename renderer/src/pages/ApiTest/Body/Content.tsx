import React, { useEffect, useRef } from 'react';
import star from '/@/assets/icon/star.svg';
import styles from './index.module.scss';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestResDataAtom,
  apiTestBodyFormatAtom,
  apiTestBodyActionAtom,
  apiTestErrAtom
} from '/@/store/apiTestStore';
import MonacoEditor from '/@cmp/MonacoEditor';
import { LanguageMapper } from '/@cmp/MonacoEditor/utils';
import PreviewRes from '/@cmp/PreviewResponse';
import { getPreviewSrc, isEditorAble, isPreviewAble } from '/@/pages/ApiTest/Body/utils';
import { judgementType } from '/@/utils/typeUtils';
import { useEditors, useEditorValue } from '/@/store/commonStore';
import { useEditorAction } from '/@cmp/MonacoEditor/editorAction';
import { Editor, EditorLanguage } from '/@cmp/MonacoEditor/type';
import ReqError from '/@cmp/ReqError';

const Content = () => {
  const resData = useAtomValue(apiTestResDataAtom);
  const formatType = useAtomValue(apiTestBodyFormatAtom);
  const bodyAction = useAtomValue(apiTestBodyActionAtom);
  const { setEditorValue } = useEditorValue('apiTest');
  const { setValue, changeLanguage } = useEditorAction({ readOnly: true });
  const editorRef = React.useRef<Editor | null>();
  const { addEditor, deleteEditor } = useEditors();
  const errorObj = useAtomValue(apiTestErrAtom);
  const firstRef = useRef(false);

  const language: EditorLanguage = LanguageMapper.get(formatType.toLowerCase()) ?? 'text/plain';

  useEffect(() => {
    if (resData && editorRef) {
      if (firstRef.current){
        setValue({
          editor: editorRef.current!,
          value: resData.body,
          language
        });
        setEditorValue(resData.body);
      } else {
        firstRef.current = true;
      }
    }
  }, [resData, editorRef.current]);

  useEffect(() => {
    if (editorRef.current) {
      changeLanguage(editorRef.current, language);
    }
  }, [formatType]);

  const onCreated = (editor: Editor) => {
    if (editor) {
      editorRef.current = editor;
      addEditor({ name: 'apiTest', editor });
    }
  };

  const onDestroyed = () => {
    editorRef.current = null;
    deleteEditor('apiTest');
  };

  const prettyRender = () => {
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
          onCreated={onCreated}
          onDestroyed={onDestroyed}
          shadow={false}
          readOnly
          language={language}
          defaultVal={''}
          height={255}
          width={'100%'}
        />
      );
    }
  };

  if (errorObj) {
    return <ReqError />;
  }

  if (!resData) {
    return <img src={star} className={styles.idleImg} alt={'等待请求'} />;
  } else {
    if (bodyAction === 'Pretty') {
      return <>{prettyRender()}</>;
    } else {
      return <PreviewRes src={getPreviewSrc(resData.body, resData!.type)} />;
    }
  }
};

export default React.memo(Content);
