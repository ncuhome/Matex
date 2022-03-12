import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// !!! Tokens can be inspected using F1 > Developer: Inspect Tokens !!!
export const jsonRules: monaco.editor.ITokenThemeRule[] = [
  {
    token: '',
    foreground: '#0ECCCC',
    fontStyle: 'italic'
  },
  {
    token: 'number.json',
    foreground: '#0ECCCC',
    fontStyle: 'italic'
  },
  {
    token: 'delimiter.bracket.json',
    foreground: '#8ADDFF'
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
    foreground: '#F2721B'
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
    foreground: '#F27293'
  },
  {
    token: 'metatag.content.html',
    foreground: '#3FDA0D'
  },
  {
    token: 'metatag.html',
    foreground: '#2CB6AD'
  },
  {
    token: 'delimiter.html',
    foreground: '#2185D0'
  },
  {
    token: 'attribute.name.html',
    foreground: '#8ADDFF'
  },
  {
    token: 'attribute.value.html',
    foreground: '#2CB6AD'
  }
];
