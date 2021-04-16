// Babel configuration
// https://babeljs.io/docs/usage/api/
module.exports = {
  plugins: [
    ['lodash', { id: ['lodash'] }],
    '@babel/plugin-transform-modules-commonjs',
  ],
};
