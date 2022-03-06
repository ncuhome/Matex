module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'node': true,
    'es6': true
  },
  'parser':'@typescript-eslint/parser',
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'plugins': ['@typescript-eslint','react'],
  'rules': {
    'no-var': 'error',// 不能使用var声明变量
    'no-unused-vars':0,
    'no-extra-semi': 'error',
    'prefer-const': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'import/extensions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': [0, 'error', 'windows'],
    // 'indent': ['error', 2, { SwitchCase: 1 }], // error类型，缩进2个空格
    'space-before-function-paren': 0, // 在函数左括号的前面是否有空格
    'eol-last': 0, // 不检测新文件末尾是否有空行
    'semi': ['error', 'always'], // 在语句后面加分号
    'quotes': ['error', 'single'],// 字符串使用单双引号,double,single
    'no-console': 0,
    'arrow-parens': 0,
    'no-new': 0,//允许使用 new 关键字
    'comma-dangle': [2, 'never'], // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，always-multiline多行模式必须带逗号，单行模式不能带逗号
    'no-undef': 0
  },
  'parserOptions': {
    'ecmaVersion': 9,
    'sourceType': 'module',
    'ecmaFeatures': {
      'modules': true
    }
  }
};

