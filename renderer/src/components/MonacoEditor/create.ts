import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { suggestions } from './suggestions';
import { htmlRules, jsonRules } from './theme';
import { defaultSchema } from './schema';
import { useEffect, useRef } from 'react';
import ProviderResult = monaco.languages.ProviderResult;
import CompletionList = monaco.languages.CompletionList;
import { editorValueAtom, useEditors } from '/@/store/commonStore';
import { useAtomValue } from 'jotai/utils';

monaco.languages.registerCompletionItemProvider('json', {
  provideCompletionItems: () => {
    return { suggestions: suggestions } as ProviderResult<CompletionList>;
  }
});
monaco.editor.defineTheme('my-theme', {
  base: 'vs',
  inherit: true,
  colors: {
    'editor.lineHighlightBorder': '#00000000',
    'editor.background': '#00000000',
    'scrollbar.shadow': '#00000000',
    'scrollbarSlider.background': '#00000000',
    'scrollbarSlider.hoverBackground': '#00000000',
    'scrollbarSlider.activeBackground': '#00000000',
    'editorWidget.border': '#00000000',
    'editorOverviewRuler.border': '#00000000'
  },
  rules: [...jsonRules, ...htmlRules]
});
monaco.editor.setTheme('my-theme');
const modelUri = monaco.Uri.parse('a://b/foo.json'); // a made up unique URI for our model
const model = monaco.editor.createModel('', 'json', modelUri);
monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  validate: true,
  schemas: [
    ...defaultSchema,
    {
      uri: 'http://myserver/foo-schema.json', // id of the first schema
      fileMatch: [modelUri.toString()], // associate with our model
      schema: {
        type: 'object',
        properties: {
          p1: {
            enum: ['v1', 'v2']
          },
          p2: {
            $ref: 'http://myserver/bar-schema.json' // reference the second schema
          }
        }
      }
    },
    {
      uri: 'http://myserver/bar-schema.json', // id of the second schema
      schema: {
        type: 'object',
        properties: {
          q1: {
            enum: ['x1', 'x2']
          }
        }
      }
    }
  ]
});

interface EditorProps {
  name: string;
  enabledMinMap?: boolean;
  readOnly: boolean;
  defaultVal: string | undefined;
  language: 'json' | 'html' | 'text/plain' | string;
}

export const useEditor = ({
  name,
  defaultVal,
  language,
  readOnly = false,
  enabledMinMap = false
}: EditorProps) => {
  const { editors, addEditor, deleteEditor } = useEditors();
  const editorValue = useAtomValue(editorValueAtom);
  const domRef = useRef<HTMLElement>();
  const editor = editors.get(name);
  const existValue = editorValue.get(name) ?? '';

  //创建新的编辑器实例
  const createEditor = (domElement: HTMLElement, initValue: string) => {
    domRef.current = domElement;
    console.log('createEditor', language);
    const editorIns = monaco.editor.create(domElement, {
      value: initValue,
      // model: language === 'json' ? model : undefined,
      model: undefined,
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
      addEditor({ name, editor: editorIns });
    }
  };

  const destroyEditor = () => {
    if (editor) {
      editor.dispose();
      deleteEditor(name);
      return true;
    } else {
      return false;
    }
  };

  //更改语言重新实例化编辑器
  useEffect(() => {
    const exist = destroyEditor();
    if (domRef.current && editor) {
      const initValue = exist ? existValue : defaultVal ?? '';
      console.log(initValue);
      createEditor(domRef.current, initValue);
    }
  }, [language]);

  useEffect(() => {
    if (editor) {
      editor.updateOptions({
        readOnly: true
      });
    }
  }, [editor]);

  useEffect(() => {
    return () => {
      destroyEditor();
    };
  }, []);
  return { destroyEditor, createEditor };
};
