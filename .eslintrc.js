// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: '@typescript-eslint/parser',

  plugins: [
    '@typescript-eslint',
  ],

  extends: [
    'airbnb-typescript/base',
  ],

  parserOptions: {
    project: './tsconfig.json',
  },

  env: {
    browser: true,
  },

  globals: {
    __RELIENT_CONFIG__: true,
    __BROWSER__: true,
  },

  rules: {
    'function-paren-newline': 'off',
    '@typescript-eslint/indent': 'off',
  },
};
