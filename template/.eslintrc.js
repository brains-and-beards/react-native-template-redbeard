module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-native/all',
    'plugin:react/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'babel', 'prettier', 'react-hooks', 'react-native', 'react'],
  env: {
    'react-native/react-native': true,
    es6: true,
    jest: true,
    node: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
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
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        bracketSpacing: true,
        semi: false,
        printWidth: 100,
        arrowParens: 'avoid',
        trailingComma: 'all',
        importOrder: [
          '<THIRD_PARTY_MODULES>',
          '^@assets/(.*)$',
          '^@utils/(.*)$',
          '^@api/(.*)$',
          '^@config/(.*)$',
          '^@hoc/(.*)$',
          '^@hooks/(.*)$',
          '^@localization/(.*)$',
          '^@redux/(.*)$',
          '^@models/(.*)$',
          '^@navigation/(.*)$',
          '^@screens/(.*)$',
          '^@services/(.*)$',
          '^[./]',
        ],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
        overrides: [
          {
            files: '*.ts',
            options: {
              parser: 'typescript',
            },
          },
          {
            files: '*.tsx',
            options: {
              parser: 'typescript',
            },
          },
          {
            files: 'translation.json',
            options: {
              tabWidth: 4,
            },
          },
        ],
      },
    ],
  },
  settings: {
    react: {
      version: '18.2.0',
    },
  },
}
