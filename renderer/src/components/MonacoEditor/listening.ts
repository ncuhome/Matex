import { useCallback, useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { Emitter } from '/@/utils/EventEmiter';
import { useEditors } from '/@/store/commonStore';
import Emittery from 'emittery';

interface ListeningProps {
  name: string;
  autoFormat: boolean;
  onChange?: (changes: monaco.editor.IModelContentChangedEvent, value: string | undefined) => void;
  onBlur?: () => void;
  watchModelMarkers?: (marks: monaco.editor.IMarker[]) => void;
  getValue?: (value: string | undefined) => void;
  setValue?: (value: string) => void;
  className?: string;
  onFocus?: () => void;
}

export const useEditorListen = ({
  name,
  autoFormat = true,
  onChange = () => {},
  onBlur = () => {},
  getValue = () => {},
  onFocus = () => {}
}: ListeningProps) => {
  const { editors } = useEditors();
  const editor = editors.get(name);
  const listenerRef = useRef<Emittery.UnsubscribeFn | null>(null);

  const setVal = useCallback(
    async (value: string) => {
      if (value) {
        editor?.updateOptions({
          readOnly: false
        });
        editor?.setValue(value);
        await editor?.getAction('editor.action.formatDocument')?.run();
        editor?.updateOptions({
          readOnly: true
        });
      }
    },
    [editor]
  );
  useEffect(() => {
    listenerRef.current?.();
    if (editor) {
      listenerRef.current = Emitter.onCache(`monacoEditor-${name}`, setVal);
    }
    return () => {
      listenerRef.current?.();
    };
  }, [editor]);

  useEffect(() => {
    if (editor) {
      let model = editor.getModel();
      model?.onDidChangeContent((e) => {
        const val = model?.getValue();
        onChange(e, val);
        getValue(val);
      });
      editor.onDidBlurEditorWidget(() => {
        onBlur();
        autoFormat && editor?.getAction('editor.action.formatDocument').run();
      });
      editor.onDidFocusEditorWidget(() => {
        onFocus();
      });
    }
  }, [editor]);
};
