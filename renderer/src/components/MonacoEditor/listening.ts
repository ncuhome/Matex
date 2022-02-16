import { useCallback, useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { Emitter } from '/@/utils/EventEmiter';
import { editorValueAtom, useEditors } from '/@/store/commonStore';
import Emittery from 'emittery';
import { useAtomValue } from 'jotai/utils';

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
  const valueRef = useRef<Emittery.UnsubscribeFn | null>(null);
  const findRef = useRef<Emittery.UnsubscribeFn | null>(null);
  const editorValue = useAtomValue(editorValueAtom);
  const existValue = editorValue.get(name);

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
    findRef.current?.();
    if (editor) {
      findRef.current = Emitter.onCache(`monacoEditor.${name}.find`, () => {
        editor?.getAction('actions.find')?.run();
      });
    }
    return () => {
      findRef.current?.();
    };
  }, [editor]);

  useEffect(() => {
    valueRef.current?.();
    if (editor) {
      valueRef.current = Emitter.onCache(`monacoEditor-${name}`, setVal);
    }
    return () => {
      valueRef.current?.();
    };
  }, [editor]);

  useEffect(() => {
    if (editor) {
      existValue && setVal(existValue);
    }
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
