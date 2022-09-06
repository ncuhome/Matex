import monaco from '/@cmp/MonacoEditor/monaco';

export type Editor = monaco.editor.IStandaloneCodeEditor;
export type EditorLanguage = 'json' | 'html' | 'text/plain' | 'text/xml' | 'javascript' | string;

export interface SetValueProps {
  editor: Editor;
  value: string;
  language: EditorLanguage;
}

export interface EditorActionProps {
  id?: string;
  watch?: boolean;
  readOnly?: boolean;
}

export interface MonacoEditorProps {
  height: number;
  width: number | string;
  border?: string;
  shadow?: boolean;
  defaultVal: string;
  language: EditorLanguage;
  readOnly?: boolean;
  enabledMinMap?: boolean;
  onCreated?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  onDestroyed?: () => void;
  onChange?: (changes: monaco.editor.IModelContentChangedEvent, value: string | undefined) => void;
  className?: string;
}

export interface UseEditorProps {
  enabledMinMap?: boolean;
  readOnly: boolean;
  language: EditorLanguage;
}
