import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { suggestions } from '/@cmp/MonacoEditor/suggestions';
import { htmlRules, jsonRules } from '/@cmp/MonacoEditor/theme';
import { defaultSchema } from '/@cmp/MonacoEditor/schema';
import { languages } from 'monaco-editor/esm/vs/editor/editor.api';
import ProviderResult = languages.ProviderResult;
import CompletionList = languages.CompletionList;

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
    'editorLineNumber.foreground': '#5B6CA9',
    'editorLineNumber.activeForeground': '#57CFFF',
    'editor.background': '#00000000',
    'editorCursor.foreground': '#57CFFF',
    'scrollbar.shadow': '#00000000',
    'scrollbarSlider.background': '#00000000',
    'scrollbarSlider.hoverBackground': '#00000000',
    'scrollbarSlider.activeBackground': '#00000000',
    'editorWidget.border': '#00000000',
    'editorOverviewRuler.border': '#00000000',
    'editorIndentGuide.background':'#00000000',
    'editorIndentGuide.activeBackground':'#6578D0',
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

export default monaco;
