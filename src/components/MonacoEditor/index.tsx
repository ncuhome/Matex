import React, { VFC, useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './index.module.scss';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import IEditorModel = editor.IEditorModel;

const Editor: VFC = () => {
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl && !editor) {
      monaco.editor.defineTheme('my-theme', {
        base: 'vs',
        inherit: true,
        colors: {
          'editor.lineHighlightBackground': '#EDEFF4'
        },
        rules: []
      });
      monaco.editor.setTheme('my-theme');
      setEditor(
        monaco.editor.create(monacoEl.current!, {
          // value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
          value: '',
          language: 'json',
          wordWrap: 'wordWrapColumn',
          wordWrapColumn: 40,
          automaticLayout: true,
          wrappingIndent: 'indent',
          scrollbar: {
            verticalScrollbarSize: 10,
            verticalSliderSize: 12
          },
          minimap: {
            enabled: false
          }
        })
      );
    }
    let model = editor?.getModel();
    model?.onDidChangeContent((e) => {
      // console.log(e);
      console.log(monaco.editor.getModelMarkers({}));
      console.log(model?.getValue());
    });
    editor?.onDidBlurEditorWidget(() => {
      editor?.getAction('editor.action.formatDocument').run();
    });
    return () => editor?.dispose();
  }, [monacoEl.current]);

  return <div className={styles.editor} ref={monacoEl} />;
};
export default Editor;
