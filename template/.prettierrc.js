module.exports = {
  singleQuote: true,
  bracketSpacing: true,
  semi: false,
  printWidth: 100,
  arrowParens: 'avoid',
  trailingComma: 'all',
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@assets/(.)$',
    '^@components/(.)$',
    '^@config/(.)$',
    '^@constants/(.)$',
    '^@helpers/(.)$',
    '^@hooks/(.)$',
    '^@localization/(.)$',
    '^@mobx/(.)$',
    '^@models/(.)$',
    '^@navigation/(.)$',
    '^@services/(.)$',
    '^@utils/(.)$',
    '^[./]',
  ],
  importOrderSeparation: false,
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
}
