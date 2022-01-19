import { ApiData } from '../../type/common';
import * as monaco from 'monaco-editor';

export interface ApiDataType {
  apiList: ApiData[];
  setApi: (index: number, key: string, value: any) => void;
}

export interface MessageChannel {
  port: MessagePort | null;
  setPort: (port: MessagePort) => void;
  cleanPort: () => void;
}

export type MonacoEditorObj = Map<string, monaco.editor.IStandaloneCodeEditor | null>;

export interface MonacoEditorTypes {
  editors: MonacoEditorObj;
  addEditor: (name: string, editor: monaco.editor.IStandaloneCodeEditor) => void;
  deleteEditor: (name: string) => void;
}
