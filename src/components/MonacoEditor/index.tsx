import React, { FC, useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { languages } from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './index.module.scss';
import clsx from 'clsx';
import { resizeAble } from './resize';
import { rules } from './theme';
import { suggestions } from './suggestions';
import { myEmitter } from '../../utils/EventEmiter';
import ProviderResult = languages.ProviderResult;
import CompletionList = languages.CompletionList;

interface MonacoEditorProps {
  name: string;
  height: number;
  width: number | string;
  defaultVal: string;
  language: string;
  readOnly?: boolean;
  enabledMinMap?: boolean;
  onChange?: (value: monaco.editor.IModelContentChangedEvent) => void;
  onBlur?: () => void;
  watchModelMarkers?: (marks: monaco.editor.IMarker[]) => void;
  getValue?: (value: string) => void;
  setValue?: (value: string) => void;
  autoFormat?: boolean;
  className?: string;
  onFocus?: () => void;
}

const MonacoEditor: FC<MonacoEditorProps> = ({
  name = '',
  height = 200,
  width = '100%',
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
  setValue = () => {},
  onFocus = () => {}
}) => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    resizeAble();
  }, [monacoEl]);

  useEffect(() => {
    myEmitter.on<string>(`monacoEditor-${name}`, (val) => {
      if (val) {
        console.log(editor);
        editor?.setValue(val);
        editor?.getAction('editor.action.formatDocument')?.run();
      }
    });
  }, [editor]);

  useEffect(() => {
    monaco.editor.defineTheme('my-theme', {
      base: 'vs',
      inherit: true,
      colors: {
        'editor.lineHighlightBorder': '#00000000',
        'editor.background': '#00000000',
        'scrollbar.shadow': '#00000000',
        'scrollbarSlider.background': '#00000000',
        'scrollbarSlider.hoverBackground': '#00000000',
        'scrollbarSlider.activeBackground': '#00000000',
        'editorWidget.border': '#00000000',
        'editorOverviewRuler.border': '#00000000'
      },
      rules
    });
    monaco.editor.setTheme('my-theme');
  }, [editor]);
  useEffect(() => {
    setEditor(null);
    monaco.languages.registerCompletionItemProvider('json', {
      provideCompletionItems: (model, position, context, token) => {
        return { suggestions: suggestions } as ProviderResult<CompletionList>;
      }
    });
    if (monacoEl && !editor) {
      console.log('初始化---');
      setEditor(
        monaco.editor.create(monacoEl.current!, {
          value: defaultVal,
          language,
          readOnly,
          automaticLayout: true,
          fontSize: 14,
          fontFamily: 'JetBrains Mono NL Light',
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
    return () => {
      console.log('删除----');
      editor?.dispose();
    };
  }, [monacoEl.current]);

  useEffect(() => {
    let model = editor?.getModel();
    model?.onDidChangeContent((e) => {
      onChange(e);
      const val = model!.getValue();
      getValue(val);
      watchModelMarkers(monaco.editor.getModelMarkers({}));
    });
    editor?.onDidBlurEditorText(() => {
      onBlur();
      console.log('失去焦点');
      autoFormat && editor?.getAction('editor.action.formatDocument').run();
    });
    editor?.onDidBlurEditorWidget(() => {
      onBlur();
      console.log('失去焦点-onDidBlurEditorWidget');
      autoFormat && editor?.getAction('editor.action.formatDocument').run();
    });
    editor?.onDidFocusEditorWidget(() => {
      onFocus();
    });
  }, [editor]);

  return (
    <div id={'monacoEditor'} style={{ height }} className={clsx([styles.editor, className])} ref={monacoEl} />
  );
};
export default MonacoEditor;
