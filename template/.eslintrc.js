module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-native/all',
    'plugin:react/recommended',
  ],
  plugins: ['@typescript-eslint', 'babel', 'react-hooks', 'react-native', 'react', 'prettier'],
  env: {
    'react-native/react-native': true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'prettier/prettier': 'error',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': ['error', { variables: false, functions: false }],
    '@typescript-eslint/no-var-requires': 'off',
    'import/order': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'error',

    // Temporarily disabled, because it crashes eslint
    // 'react-native/no-raw-text': ['error', { skip: ['SystemText'] }],
    'react-native/no-raw-text': 'off',
    'react/prop-types': 'off',
    'sort-imports': 'off',
  },
  settings: {
    react: {
      version: '18.2.0',
    },
  },
}
