export interface EditorProps {
  name: string;
  editor: editor.IStandaloneCodeEditor;
}

export interface StartBtnProps {
  text: string;
  className: 'startBtnNormal' | 'startBtnSuccess' | 'startBtnError';
}
