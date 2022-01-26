import { useCallback, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { myEmitter } from '/@/utils/EventEmiter';
import { useEditors } from '/@/store/commonStore';

interface ListeningProps {
  name: string;
  autoFormat: boolean;
  onChange?: (value: monaco.editor.IModelContentChangedEvent) => void;
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
  console.log(editors);
  const editor = editors.get(name);

  const setVal = useCallback(
    (value: string) => {
      console.log('收到');
      if (value) {
        editor?.setValue(value);
        editor?.getAction('editor.action.formatDocument')?.run();
      }
    },
    [editor]
  );

  useEffect(() => {
    myEmitter.offAll(`monacoEditor-${name}`);
    if (editor) {
      myEmitter.on<string>(`monacoEditor-${name}`, setVal);
    }
  }, [editor]);

  useEffect(() => {
    let model = editor?.getModel();
    model?.onDidChangeContent((e) => {
      onChange(e);
      const val = model?.getValue();
      getValue(val);
    });
    editor?.onDidBlurEditorWidget(() => {
      onBlur();
      autoFormat && editor?.getAction('editor.action.formatDocument').run();
    });
    editor?.onDidFocusEditorWidget(() => {
      onFocus();
    });
  }, [editor]);
};
