import React, { FC, memo, useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import styles from './index.module.scss';
import clsx from 'clsx';
import { resizeAble } from './resize';
import { useEditor } from './create';
import { useEditorListen } from './listening';

interface MonacoEditorProps {
  name: string;
  height: number;
  width: number | string;
  border?: string;
  shadow?: boolean;
  defaultVal: string;
  language: string;
  readOnly?: boolean;
  enabledMinMap?: boolean;
  actions?: React.ReactNode;
  onChange?: (changes: monaco.editor.IModelContentChangedEvent, value: string | undefined) => void;
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
  language = 'json',
  defaultVal = '',
  shadow = true,
  enabledMinMap = false,
  readOnly = false,
  autoFormat = true,
  className = '',
  actions,
  border,
  onChange = () => {},
  onBlur = () => {},
  getValue = () => {},
  onFocus = () => {}
}) => {
  const monacoEl = useRef(null);
  const { createEditor } = useEditor({ name, enabledMinMap, defaultVal, language, readOnly });
  useEditorListen({
    autoFormat,
    onBlur,
    onFocus,
    name,
    onChange,
    getValue
  });

  useEffect(() => {
    resizeAble();
  }, [monacoEl.current]);

  useEffect(() => {
    if (monacoEl) {
      createEditor(monacoEl.current!, '');
    }
  }, [monacoEl]);

  const renderActions = () => {
    if (actions) {
      return <div className={styles.operate}>{actions}</div>;
    }
  };

  const curHeight = actions ? height : parseInt(String(height)) + 50;

  return (
    <div className={clsx([styles.con, shadow && styles.shadow])} style={{ border }}>
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
export default memo(MonacoEditor);
