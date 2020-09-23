module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['prettier'],
  rules: {
    semi: ['error', 'always'],
    indent: ['error', 2],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'quotes': ['error', 'single'],
    'object-curly-spacing':[
      1,
      'always'
    ]
  }
};
