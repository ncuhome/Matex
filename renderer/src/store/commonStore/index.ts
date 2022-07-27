import { atom } from 'jotai';
import { editor } from 'monaco-editor';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import type { EditorProps } from '/@/store/commonStore/type';
import type { DownloadProgress } from '/@common/index';
import type { Terminal } from 'xterm';

export const preRouteAtom = atom('');
export const collapseAtom = atom(false);
//editor
export const editorsAtom = atom(new Map<string, editor.IStandaloneCodeEditor | null>());
export const editorValueAtom = atom(new Map<string, string>());
export const fullscreenAtom = atom(false);
export const updateProgressAtom = atom<DownloadProgress | undefined>(undefined);
export const terminalAtom = atom<Terminal | undefined>(undefined);

export const addEditorsAtom = atom(null, (get, set, { name, editor }: EditorProps) => {
  const tempMap = new Map<string, editor.IStandaloneCodeEditor | null>(get(editorsAtom));
  tempMap.set(name, editor);
  set(editorsAtom, tempMap);
});
export const deleteEditorsAtom = atom(null, (get, set, name: string) => {
  const tempMap = new Map<string, editor.IStandaloneCodeEditor | null>(get(editorsAtom));
  tempMap.delete(name);
  set(editorsAtom, tempMap);
});

export const updateEditorValueAtom = atom(
  null,
  (get, set, { name, value }: { name: string; value: string }) => {
    const tempMap = new Map<string, string>(get(editorValueAtom));
    tempMap.set(name, value);
    set(editorValueAtom, tempMap);
  }
);

export const useEditors = () => {
  const addEditor = useUpdateAtom(addEditorsAtom);
  const deleteEditor = useUpdateAtom(deleteEditorsAtom);
  const editors = useAtomValue(editorsAtom);
  return { editors, addEditor, deleteEditor };
};

export const useEditorValue = (name: string) => {
  const updateValue = useUpdateAtom(updateEditorValueAtom);
  const editorValueMap = useAtomValue(editorValueAtom);
  const editorValue = editorValueMap.get(name);
  const setEditorValue = (value: string) => {
    updateValue({ name, value });
  };

  return { editorValue, setEditorValue };
};
