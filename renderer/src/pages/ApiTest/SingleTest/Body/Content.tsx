import React, { useEffect, useRef, useState } from 'react';
import star from '/@/assets/icon/star.svg';
import styles from './index.module.scss';
import { useAtomValue } from 'jotai/utils';
import {
  apiTestResDataAtom,
  apiTestBodyFormatAtom,
  apiTestBodyActionAtom,
  apiTestErrAtom,
  apiTestBodyDisplayAtom
} from '/@/store/apiTestStore';
import MonacoEditor from '/@cmp/MonacoEditor';
import { LanguageMapper } from '/@cmp/MonacoEditor/utils';
import PreviewRes from '/@cmp/PreviewResponse';
import { getPreviewSrc, isEditorAble, isPreviewAble } from '/@/pages/ApiTest/SingleTest/Body/utils';
import { judgementType } from '/@/utils/typeUtils';
import { useEditors, useEditorValue } from '/@/store/commonStore';
import { useEditorAction } from '/@cmp/MonacoEditor/editorAction';
import { Editor, EditorLanguage } from '/@cmp/MonacoEditor/type';
import ReqError from '/@cmp/ReqError';
import clsx from 'clsx';
import { Emitter } from '/@/utils/EventEmiter';
import Emittery from 'emittery';
import { editor } from 'monaco-editor';
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import { FormatType } from '/@/type/apiTest';

const Content = () => {
  const resData = useAtomValue(apiTestResDataAtom);
  const formatType = useAtomValue(apiTestBodyFormatAtom);
  const bodyAction = useAtomValue(apiTestBodyActionAtom);
  const { setEditorValue } = useEditorValue('apiTest');
  const { setValue, changeLanguage } = useEditorAction({ id: 'apiTest', readOnly: true, watch: true });
  const editorRef = React.useRef<Editor | null>();
  const { addEditor, deleteEditor } = useEditors();
  const errorObj = useAtomValue(apiTestErrAtom);
  const displayItem = useAtomValue(apiTestBodyDisplayAtom);
  const [showEditor, setShowEditor] = useState(false);
  const listenerRef = useRef<Emittery.UnsubscribeFn>();

  const language: EditorLanguage = LanguageMapper.get(formatType.toLowerCase()) ?? 'text/plain';

  useEffect(() => {
    if (resData) {
      if (displayItem === 'Headers') {
        setShowEditor(true);
      } else {
        if (bodyAction !== 'Pretty') {
          setShowEditor(false);
        } else {
          const resType = judgementType(resData!.type);
          setShowEditor(isEditorAble(resType));
        }
      }
    }
  }, [resData, displayItem, bodyAction]);

  useEffect(() => {
    if (resData && showEditor) {
      if (displayItem === 'Body') {
        setValue({
          editor: editorRef.current!,
          value: resData.body,
          language
        });
        setEditorValue(resData.body);
      } else {
        setValue({
          editor: editorRef.current!,
          value: JSON.stringify(resData.headers),
          language
        });
        setEditorValue(JSON.stringify(resData.headers));
      }
    }
  }, [resData, showEditor, displayItem]);

  useEffect(() => {
    listenerRef.current?.();
    if (editorRef.current) {
      listenerRef.current = Emitter.on('apiTest.format', (data: FormatType) => {
        const _language: EditorLanguage = LanguageMapper.get(data.toLowerCase()) ?? 'text/plain';
        changeLanguage(editorRef.current as IStandaloneCodeEditor, _language);
      });
    }
    return () => {
      listenerRef.current?.();
    };
  }, [editorRef.current]);

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

  const renderContent = () => {
    if (!resData) {
      return <img src={star} className={clsx([styles.idleImg])} alt={'等待请求'} />;
    } else {
      const resType = judgementType(resData!.type);
      if (bodyAction !== 'Pretty') {
        return <PreviewRes src={getPreviewSrc(resData.body, resData!.type)} />;
      } else {
        if (displayItem === 'Headers') {
          return null;
        }
        if (!isEditorAble(resType)) {
          if (isPreviewAble(resType)) {
            return <PreviewRes src={getPreviewSrc(resData!.body, resData!.type)} />;
          } else {
            return <div>无法预览</div>;
          }
        } else {
          return null;
        }
      }
    }
  };

  if (errorObj) {
    return <ReqError />;
  }

  return (
    <>
      <div className={clsx([showEditor ? styles.show : styles.hidden])}>
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
      </div>
      {renderContent()}
    </>
  );
};

export default React.memo(Content);
