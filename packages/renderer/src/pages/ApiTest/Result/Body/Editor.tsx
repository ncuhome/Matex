import React, { Suspense, useEffect, useRef } from 'react';
import { useEditorAction } from '/@cmp/MonacoEditor/editorAction';
import { Editor, EditorLanguage } from '/@cmp/MonacoEditor/type';
import CircleDotLoading from '/@cmp/Loading/CircleDotLoading';
import styles from './index.module.scss';
import { useAtom, useAtomValue } from 'jotai';
import { ResFormatTypeAtom } from '/@/store/ApiTest/result.store';
import { LanguageMapper } from '/@cmp/MonacoEditor/utils';
import { ResFormatType } from '/@/Model/ApiTest.model';
import { emittery } from '/@/utils/instance';
import Emittery from 'emittery';

const MonacoEditor = React.lazy(() => import('/@/components/MonacoEditor'));

interface BodyEditorProps {
  language: EditorLanguage;
  value: string;
}

const ResultBodyEditor: React.FC<BodyEditorProps> = ({ language, value }) => {
  const { setValue, changeLanguage } = useEditorAction({ id: 'resEditor', readOnly: true });
  const editorRef = React.useRef<Editor | null>(null);
  const listenRef = useRef<Emittery.UnsubscribeFn>();

  useEffect(() => {
    if (editorRef.current) {
      const _language = editorRef.current?.getModel()?.getLanguageId();
      const _value = editorRef.current?.getValue();
      if (_language !== language || _value !== value) {
        setValue({
          language: language,
          editor: editorRef.current,
          value
        });
      }
    }
  }, [language, value]);

  useEffect(() => {
    emittery.on('formatType:changeLanguage', (formatType: ResFormatType) => {
      if (editorRef.current) {
        const _language = editorRef.current?.getModel()?.getLanguageId();
        const language = LanguageMapper.get(formatType) ?? 'text/plain';
        if (_language !== language) {
          changeLanguage(editorRef.current, language);
        }
      }
    });
    return () => {
      listenRef.current?.();
    };
  }, []);

  const onCreated = (editor) => {
    editorRef.current = editor;
    if (editor) {
      setValue({
        language: language,
        editor,
        value
      });
    }
  };

  return (
    <Suspense fallback={<CircleDotLoading />}>
      <div className={styles.editorCon}>
        <MonacoEditor
          onCreated={onCreated}
          onDestroyed={() => (editorRef.current = null)}
          shadow={true}
          border={'1px solid var(--dark-color2)'}
          readOnly={false}
          language={language}
          defaultVal={''}
          height={250}
          width={'100%'}
        />
      </div>
    </Suspense>
  );
};

export default ResultBodyEditor;
