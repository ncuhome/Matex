import React, { FC, useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './index.module.scss';

interface MonacoEditorProps {
  defaultVal: string;
  language: string;
  enabledMinMap?: boolean;
  onChange?: (value: monaco.editor.IModelContentChangedEvent) => void;
  onBlur?: () => void;
  watchModelMarkers?: (marks: monaco.editor.IMarker[]) => void;
  getValue?: (value: string) => void;
  autoFormat?: boolean;
}

const MonacoEditor: FC<MonacoEditorProps> = ({
  language = 'json',
  defaultVal = '',
  enabledMinMap = false,
  autoFormat = true,
  watchModelMarkers = () => {},
  onChange = () => {},
  onBlur = () => {},
  getValue = () => {}
}) => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    monaco.editor.defineTheme('my-theme', {
      base: 'vs',
      inherit: true,
      colors: {
        'editor.lineHighlightBackground': '#EDEFF4'
      },
      rules: []
    });
    monaco.editor.setTheme('my-theme');
  }, []);

  useEffect(() => {
    if (monacoEl && !editor) {
      setEditor(
        monaco.editor.create(monacoEl.current!, {
          value: defaultVal,
          language,
          scrollbar: {
            verticalScrollbarSize: 10,
            verticalSliderSize: 12
          },
          minimap: {
            enabled: enabledMinMap
          }
        })
      );
    }
    return () => editor?.dispose();
  }, [monacoEl.current]);

  useEffect(() => {
    let model = editor?.getModel();
    model?.onDidChangeContent((e) => {
      onChange(e);
      getValue(model!.getValue());
      watchModelMarkers(monaco.editor.getModelMarkers({}));
    });
    editor?.onDidBlurEditorWidget(() => {
      onBlur();
      autoFormat && editor?.getAction('editor.action.formatDocument').run();
    });
  }, []);

  return <div className={styles.editor} ref={monacoEl} />;
};
export default MonacoEditor;
