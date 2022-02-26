import monaco from './monaco';
import { EditorActionProps, SetValueProps, Editor, EditorLanguage } from '/@cmp/MonacoEditor/type';
import { useThrottleFn } from 'ahooks';
import toast from 'react-hot-toast';

export const useEditorAction = ({ readOnly = false }: EditorActionProps) => {
  //设置编辑器的值
  const { run } = useThrottleFn(
    async ({ editor, language, value }: SetValueProps) => {
      if (editor) {
        if (readOnly) {
          editor?.updateOptions({
            readOnly: false
          });
        }
        editor.setModel(monaco.editor.createModel(value, language));
        await editor.getAction('editor.action.formatDocument')?.run();
        editor?.updateOptions({
          readOnly: readOnly
        });
      }
    },
    { wait: 1000 }
  );

  //获取编辑器的值
  const getValue = (editor: Editor) => {
    return editor.getValue();
  };

  //设置编辑器语言
  const changeLanguage = async (editor: Editor, language: EditorLanguage) => {
    const preValue = getValue(editor);
    editor.getModel()?.dispose();
    if (readOnly) {
      editor?.updateOptions({
        readOnly: false
      });
    }
    editor.setModel(monaco.editor.createModel(preValue, language));
    await editor.getAction('editor.action.formatDocument')?.run();
    editor?.updateOptions({
      readOnly: readOnly
    });
  };

  //更改编辑器只读状态
  const updateReadOnly = (editor: Editor, readOnly: boolean) => {
    editor.updateOptions({
      readOnly: readOnly
    });
  };

  //执行编辑器的查找操作
  const executeFind = async (editor: Editor) => {
    await editor.getAction('actions.find')?.run();
  };

  return {
    setValue: run,
    getValue,
    updateReadOnly,
    changeLanguage,
    executeFind
  };
};
