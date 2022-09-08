module.exports = {
    'env': {
        'browser': true,
        'node': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'warn',
            4,
            { 'SwitchCase': 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'warn',
            'single'
        ],
        'semi': [
            'warn',
            'never'
        ],
        'arrow-parens': [
            'warn',
            'as-needed'
        ],
        'max-len': [
            'warn',
            { 'code': 120 }
        ],
        'no-unused-vars': 0,
        'no-empty-pattern': 0,
        'react/prop-types': 0
    }
}
