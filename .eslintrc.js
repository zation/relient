// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: 'babel-eslint',

  extends: [
    'airbnb',
  ],

  env: {
    browser: true,
  },

  globals: {
    __RELIENT_CONFIG__: true,
    __BROWSER__: true,
  },
};
