import React, { FC, useCallback, useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { languages } from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './index.module.scss';
import clsx from 'clsx';
import { resizeAble } from './resize';
import { rules } from './theme';
import { suggestions } from './suggestions';
import { myEmitter } from '../../utils/EventEmiter';
import { useEditors } from '../../zustand/store/apiData.store';
import ProviderResult = languages.ProviderResult;
import CompletionList = languages.CompletionList;

monaco.languages.registerCompletionItemProvider('json', {
  provideCompletionItems: (model, position, context, token) => {
    return { suggestions: suggestions } as ProviderResult<CompletionList>;
  }
});
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
  const monacoEl = useRef(null);
  const { editors, addEditor, deleteEditor } = useEditors((state) => state);
  useEffect(() => {
    resizeAble();
  }, [monacoEl]);
  const editor = editors.get(name);
  console.log('editor', editor);
  console.log(editors);

  useEffect(() => {
    console.log('重新render');
  }, [editor]);

  const setVal = useCallback(
    (value: string) => {
      if (value) {
        console.log(editor);
        console.log(myEmitter.listeners);
        editor?.setValue(value);
        editor?.getAction('editor.action.formatDocument')?.run();
      }
    },
    [editor]
  );

  useEffect(() => {
    if (monacoEl && !editor) {
      console.log('初始化---');
      const editor_ = monaco.editor.create(monacoEl.current!, {
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
      });
      addEditor(name, editor_);
    }
    return () => {
      console.log('清除editor');
      deleteEditor(name);
      myEmitter.offAll(`monacoEditor-${name}`);
    };
  }, []);

  useEffect(() => {
    if (editor) {
      myEmitter.on<string>(`monacoEditor-${name}`, setVal);
    }
  }, [editor]);

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
      autoFormat && editor?.getAction('editor.action.formatDocument').run();
    });
    editor?.onDidBlurEditorWidget(() => {
      onBlur();
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
