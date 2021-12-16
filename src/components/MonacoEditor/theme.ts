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
  {
    token: 'delimiter.comma.json',
    foreground: '#3C878A'
  },
  {
    token: 'string.key.json',
    foreground: '#AC2B2E'
  },
  {
    token: 'string.value.json',
    foreground: '#14C929'
  },
  {
    token: 'custom-highlight',
    foreground: '#FAC901'
  }
];
