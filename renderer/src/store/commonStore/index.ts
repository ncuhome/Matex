import { atom } from 'jotai';
import { editor } from 'monaco-editor';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import {EditorProps} from '/@/store/commonStore/type';



export const preRouteAtom = atom('');
export const collapseAtom = atom(false);
export const editorsAtom_ = atom(new Map<string, editor.IStandaloneCodeEditor | null>());

export const addEditorsAtom = atom(null, (get, set, { name, editor }: EditorProps) => {
  const tempMap = new Map<string, editor.IStandaloneCodeEditor | null>(get(editorsAtom_));
  tempMap.set(name, editor);
  set(editorsAtom_, tempMap);
});
export const deleteEditorsAtom = atom(null, (get, set, name: string) => {
  const tempMap = new Map<string, editor.IStandaloneCodeEditor | null>(get(editorsAtom_));
  tempMap.delete(name);
  set(editorsAtom_, tempMap);
});
export const useEditors = () => {
  const addEditor = useUpdateAtom(addEditorsAtom);
  const deleteEditor = useUpdateAtom(deleteEditorsAtom);
  const editors = useAtomValue(editorsAtom_);
  return { editors, addEditor, deleteEditor };
};
