module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-native/all',
    'plugin:react/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'babel', 'prettier', 'react-hooks', 'react-native', 'react'],
  env: {
    'react-native/react-native': true,
    es6: true,
    jest: true,
    node: true
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': ['error', { variables: false, functions: false }],
    '@typescript-eslint/no-var-requires': 'off',
    'import/order': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',

    // Temporarily disabled, because it crashes eslint
    // 'react-native/no-raw-text': ['error', { skip: ['SystemText'] }],
    'react-native/no-raw-text': 'off',

    'react/prop-types': 'off',
    'sort-imports': 'off'
  },
  settings: {
    react: {
      version: '18.2.0'
    }
  }
}
