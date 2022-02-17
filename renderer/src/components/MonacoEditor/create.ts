import monaco from './monaco';
import {useEffect, useRef} from 'react';
import {Editor, UseEditorProps} from '/@cmp/MonacoEditor/type';



export const useEditor = ({
  language,
  readOnly = false,
  enabledMinMap = false
}: UseEditorProps) => {
  const editorRef = useRef<Editor>();

  //创建新的编辑器实例
  const createEditor = (domElement: HTMLElement, initValue: string) => {
    const editorIns = monaco.editor.create(domElement, {
      value: initValue,
      // model: language === 'json' ? model : undefined,
      model:null,
      language,
      readOnly,
      automaticLayout: false,
      fontSize: 14,
      fontFamily: 'JetBrains Mono NL Light',
      scrollbar: {
        verticalScrollbarSize: 10,
        verticalSliderSize: 12
      },
      minimap: {
        enabled: enabledMinMap
      }
    });


    if (editorIns) {
      editorRef.current = editorIns;
    }
    return editorIns;
  };

  const destroyEditor = () => {
    if (editorRef.current) {
      editorRef.current.dispose();
      return true;
    } else {
      return false;
    }
  };
  return { destroyEditor, createEditor };
};
