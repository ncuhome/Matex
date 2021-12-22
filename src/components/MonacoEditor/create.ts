import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { languages } from 'monaco-editor/esm/vs/editor/editor.api';
import { suggestions } from './suggestions';
import { rules } from './theme';
import { defaultSchema } from './schema';
import { useEffect, useState } from 'react';
import { editor } from 'monaco-editor';
import ProviderResult = languages.ProviderResult;
import CompletionList = languages.CompletionList;

monaco.languages.registerCompletionItemProvider('json', {
  provideCompletionItems: (model, position, context, token) => {
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
  rules
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
  domElement: HTMLElement;
  enabledMinMap?: boolean;
  readOnly: boolean;
  defaultVal: string | undefined;
  language: 'json' | 'html' | 'text/plain' | string;
}

export const useEditor = () => {
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(null);

  const createEditor = ({
    domElement,
    defaultVal,
    language,
    readOnly = false,
    enabledMinMap = false
  }: EditorProps) => {
    const editorIns = monaco.editor.create(domElement, {
      value: defaultVal,
      model: model,
      language,
      readOnly,
      automaticLayout: true,
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
    setEditor(editorIns);
  };

  const destroyEditor = () => {
    editor?.dispose();
    setEditor(null);
  };

  useEffect(() => {
    return () => {
      editor?.dispose();
    };
  }, []);
  return { editor, destroyEditor, createEditor };
};
