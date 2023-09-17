module.exports = {
  'env': {
    'browser': true,
    'es2024': true,
    'node': true,
    'webextensions': true,
  },
  'globals': {
    'NodeJS': true,
    'NodeListOf': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
    {
      'files': ['*.svelte'],
      'parser': 'svelte-eslint-parser',
      'parserOptions': {
        'parser': '@typescript-eslint/parser',
      },
    },
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'extraFileExtensions': ['.svelte'],
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
  },
};
