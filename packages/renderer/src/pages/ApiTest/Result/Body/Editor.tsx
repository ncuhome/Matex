import React, { Suspense, useEffect } from 'react';
import { useAtom } from 'jotai';
import { RawConfigValue, RawTypeValue } from '/@/store/ApiTest/config.store';
import { useEditorAction } from '/@cmp/MonacoEditor/editorAction';
import { Editor, EditorLanguage } from '/@cmp/MonacoEditor/type';
import { LanguageMapper } from '/@cmp/MonacoEditor/utils';
import CircleDotLoading from '/@cmp/Loading/CircleDotLoading';
import styles from './index.module.scss';

const MonacoEditor = React.lazy(() => import('/@/components/MonacoEditor'));

interface BodyEditorProps {
  language: EditorLanguage;
  value: string;
}

const ResultBodyEditor: React.FC<BodyEditorProps> = ({ language, value }) => {
  const { setValue } = useEditorAction({ id: 'resEditor', readOnly: false });
  const editorRef = React.useRef<Editor | null>(null);

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
