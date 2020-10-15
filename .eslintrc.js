module.exports = {
    env: {
        'es6': true,
        'node': true,
    },
    extends: [
        'standard',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    plugins: ['prettier'],
    rules: {
        semi: ['error', 'always'],
        indent: ['error', 4],
        'comma-spacing': ['error', { before: false, after: true }],
        quotes: ['error', 'single'],
        'object-curly-spacing': [
            1,
            'always'
        ],
        'no-undef': 'off',
        'one-var': 'off',
        camelcase: 'off'
    }
};
