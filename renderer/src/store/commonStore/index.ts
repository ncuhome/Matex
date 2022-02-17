import { atom } from 'jotai';
import { editor } from 'monaco-editor';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { EditorProps } from '/@/store/commonStore/type';

export const preRouteAtom = atom('');
export const collapseAtom = atom(false);
//editor
export const editorsAtom = atom(new Map<string, editor.IStandaloneCodeEditor | null>());
export const editorValueAtom = atom(new Map<string, string>());

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

export const useUpdateEditorValue = (name: string) => {
  const setValue = useUpdateAtom(updateEditorValueAtom);
  return (value: string) => {
    setValue({ name, value });
  };
};
