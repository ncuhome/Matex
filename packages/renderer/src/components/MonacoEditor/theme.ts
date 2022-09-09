import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// !!! Tokens can be inspected using F1 > Developer: Inspect Tokens !!!
export const jsonRules: monaco.editor.ITokenThemeRule[] = [
  {
    token: '',
    foreground: '#5164E8'
  },
  {
    token: 'other.json',
    foreground: '#0ECCCC'
  },
  {
    token: 'number.json',
    foreground: '#0ECCCC'
  },
  {
    token: 'keyword.json',
    foreground: '#7595E1'
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
    foreground: '#6578B8'
  },
  {
    token: 'string.key.json',
    foreground: '#F2721B'
  },
  {
    token: 'string.value.json',
    foreground: '#6DCE66'
  },
  {
    token: 'custom-highlight',
    foreground: '#FAC901'
  }
];

export const htmlRules: monaco.editor.ITokenThemeRule[] = [
  {
    token: '',
    foreground: '#ABB2BF'
  },
  {
    token: 'tag.html',
    foreground: '#E06C75'
  },
  {
    token: 'metatag.content.html',
    foreground: '#C477DA'
  },
  {
    token: 'metatag.html',
    foreground: '#6C75E0'
  },
  {
    token: 'delimiter.html',
    foreground: '#ABB2BF'
  },
  {
    token: 'attribute.name.html',
    foreground: '#E09D6C'
  },
  {
    token: 'attribute.value.html',
    foreground: '#3DCC6E'
  }
];

export const cssRules: monaco.editor.ITokenThemeRule[] = [
  {
    token: 'tag.css',
    foreground: '#F2731B'
  },
  {
    token: 'keyword.css',
    foreground: '#F2731B'
  },
  {
    token:'delimiter.bracket.css',
    foreground:'#6C75E0'
  },
  {
    token:'attribute.value.css',
    foreground:'#6C75E0'
  },
  {
    token:'attribute.name.css',
    foreground:'#D73E4A'
  },
  {
    token:'attribute.value.hex.css',
    foreground:'#4BA9D7'
  },
  {
    token:'attribute.value.number.css',
    foreground:'#4BA9D7'
  },
  {
    token:'attribute.value.unit.css',
    foreground:'#4BA9D7'
  }
];
