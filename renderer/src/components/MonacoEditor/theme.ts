import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// !!! Tokens can be inspected using F1 > Developer: Inspect Tokens !!!
export const jsonRules: monaco.editor.ITokenThemeRule[] = [
  {
    token: 'number.json',
    foreground: '#0ECCCC',
    fontStyle: 'italic'
  },
  {
    token: 'delimiter.bracket.json',
    foreground: '#7F81CC'
  },
  //冒号
  {
    token: 'delimiter.colon.json',
    foreground: '#49B2D3'
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
    foreground: '#A3A5DB'
  },
  {
    token: 'string.value.json',
    foreground: '#4ED26D'
  },
  {
    token: 'custom-highlight',
    foreground: '#FAC901'
  }
];

export const htmlRules: monaco.editor.ITokenThemeRule[] = [
  {
    token: 'tag.html',
    foreground: '#F84806'
  },
  {
    token: 'delimiter.html',
    foreground: '#2185D0'
  },
  {
    token: 'attribute.name.html',
    foreground: '#3B46CC'
  },
  {
    token: 'attribute.value.html',
    foreground: '#2CB6AD'
  }
];
