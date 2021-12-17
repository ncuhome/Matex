import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// !!! Tokens can be inspected using F1 > Developer: Inspect Tokens !!!
export const rules: monaco.editor.ITokenThemeRule[] = [
  {
    token: 'number.json',
    foreground: '#FA86A3'
  },
  {
    token: 'delimiter.bracket.json',
    foreground: '#FA6C37'
  },
  //冒号
  {
    token: 'delimiter.colon.json',
    foreground: '#090821'
  },
  //中括号
  {
    token: 'delimiter.array.json',
    foreground: '#DC7DFB'
  },
  {
    token: 'delimiter.comma.json',
    foreground: '#3C878A'
  },
  {
    token: 'string.key.json',
    foreground: '#514945'
  },
  {
    token: 'string.value.json',
    foreground: '#1B9540'
  },
  {
    token: 'custom-highlight',
    foreground: '#FAC901'
  }
];
