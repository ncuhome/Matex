import React, { FC, useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './index.module.scss';
import clsx from 'clsx';
import { resizeAble } from './resize';
import { myEmitter } from '../../utils/EventEmiter';
import { useEditors } from '../../zustand/store/apiData.store';
import { useEditor } from './create';
import { useEditorListen } from './listening';

interface MonacoEditorProps {
  name: string;
  height: number;
  width: number | string;
  defaultVal: string;
  language: string;
  readOnly?: boolean;
  enabledMinMap?: boolean;
  actions?: React.ReactNode;
  onChange?: (value: monaco.editor.IModelContentChangedEvent) => void;
  onBlur?: () => void;
  watchModelMarkers?: (marks: monaco.editor.IMarker[]) => void;
  getValue?: (value: string | undefined) => void;
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
  actions,
  watchModelMarkers = () => {},
  onChange = () => {},
  onBlur = () => {},
  getValue = () => {},
  setValue = () => {},
  onFocus = () => {}
}) => {
  const monacoEl = useRef(null);
  const { editors, addEditor, deleteEditor } = useEditors((state) => state);
  const { editor, createEditor, destroyEditor } = useEditor();
  useEditorListen({
    autoFormat,
    onBlur,
    onFocus,
    name,
    onChange,
    getValue
  });

  useEffect(() => {
    if (editor) {
      addEditor(name, editor);
    }
  }, [editor]);

  useEffect(() => {
    resizeAble();
  }, [monacoEl.current]);

  console.log(editors);

  useEffect(() => {
    if (monacoEl) {
      createEditor({
        enabledMinMap,
        defaultVal,
        language,
        readOnly,
        domElement: monacoEl.current!
      });
    }
    return () => {
      console.log('清除editor');
      destroyEditor();
      deleteEditor(name);
      myEmitter.offAll(`monacoEditor-${name}`);
    };
  }, [monacoEl]);

  const renderActions = () => {
    if (actions) {
      return <div className={styles.operate}>{actions}</div>;
    }
  };

  const curHeight = actions ? height : parseInt(String(height)) + 50;

  return (
    <div className={styles.con}>
      {renderActions()}
      <div
        id={'monacoEditor'}
        style={{ height: curHeight }}
        className={clsx([styles.editor, className])}
        ref={monacoEl}
      />
    </div>
  );
};
export default MonacoEditor;
