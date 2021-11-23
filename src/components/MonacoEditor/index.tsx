import React, { FC, useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './index.module.scss';
import clsx from 'clsx';
import { resizeAble } from './resize';
import { rules } from './theme';
import { languages } from 'monaco-editor/esm/vs/editor/editor.api';
import ProviderResult = languages.ProviderResult;
import CompletionList = languages.CompletionList;
import { suggestions } from './suggestions';

interface MonacoEditorProps {
  defaultVal: string;
  language: string;
  readOnly?: boolean;
  enabledMinMap?: boolean;
  onChange?: (value: monaco.editor.IModelContentChangedEvent) => void;
  onBlur?: () => void;
  watchModelMarkers?: (marks: monaco.editor.IMarker[]) => void;
  getValue?: (value: string) => void;
  autoFormat?: boolean;
  className?: string;
  onFocus?: () => void;
}

const MonacoEditor: FC<MonacoEditorProps> = ({
  language = 'json',
  defaultVal = '',
  enabledMinMap = false,
  readOnly = false,
  autoFormat = true,
  className = '',
  watchModelMarkers = () => {},
  onChange = () => {},
  onBlur = () => {},
  getValue = () => {},
  onFocus = () => {}
}) => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    resizeAble();
  }, [monacoEl]);

  useEffect(() => {
    monaco.editor.defineTheme('my-theme', {
      base: 'vs',
      inherit: true,
      colors: {
        'editor.lineHighlightBorder': '#00000006'
      },
      rules
    });
    monaco.editor.setTheme('my-theme');
  }, []);

  useEffect(() => {
    setEditor(null);
    monaco.languages.setMonarchTokensProvider('json', {
      tokenizer: {
        root: [[/&ui/, { token: 'custom-highlight' }]]
      }
    });
    monaco.languages.registerCompletionItemProvider('json', {
      provideCompletionItems: (model, position, context, token) => {
        return { suggestions: suggestions } as ProviderResult<CompletionList>;
      }
    });
    if (monacoEl && !editor) {
      setEditor(
        monaco.editor.create(monacoEl.current!, {
          value: defaultVal,
          language,
          readOnly,
          automaticLayout: true,
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
      const val = model!.getValue();
      getValue(val);
      watchModelMarkers(monaco.editor.getModelMarkers({}));
    });
    editor?.onDidBlurEditorWidget(() => {
      onBlur();
      autoFormat && editor?.getAction('editor.action.formatDocument').run();
    });
    editor?.onDidFocusEditorWidget(() => {
      onFocus();
    });
  }, []);

  return <div id={'monacoEditor'} className={clsx([styles.editor, className])} ref={monacoEl} />;
};
export default MonacoEditor;
