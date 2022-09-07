import React, { FC, memo, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import clsx from 'clsx';
import { resizeAble } from './resize';
import { useEditor } from './create';
import { Editor, MonacoEditorProps } from '/@cmp/MonacoEditor/type';

const MonacoEditor: FC<MonacoEditorProps> = ({
  height = 200,
  language = 'json',
  defaultVal = '',
  shadow = true,
  enabledMinMap = false,
  readOnly = false,
  className = '',
  border,
  onCreated = () => {},
  onDestroyed = () => {},
  onChange = () => {}
}) => {
  const monacoEl = useRef(null);
  const editorRef = useRef<Editor>();
  const { createEditor, destroyEditor } = useEditor({ enabledMinMap, language, readOnly });

  useEffect(() => {
    resizeAble();
  }, [monacoEl.current]);

  useEffect(() => {
    if (monacoEl) {
      const editorIns = createEditor(monacoEl.current!, defaultVal);
      if (editorIns) {
        editorRef.current = editorIns;
        onCreated(editorIns);
      }
    }
  }, [monacoEl]);

  useEffect(() => {
    return () => {
      const res = destroyEditor();
      res && onDestroyed();
    };
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.onDidChangeModelContent((e) => {
        onChange && onChange(e, editorRef.current?.getValue());
      });
    }
  }, [editorRef.current]);

  return (
    <div className={clsx([styles.con])} style={{ border }}>
      <div
        id={'monacoEditor'}
        style={{ height:height-17 }}
        className={clsx([styles.editor, className])}
        ref={monacoEl}
      />
    </div>
  );
};
export default memo(MonacoEditor);
