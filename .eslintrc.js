module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-mixed-operators': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'no-bitwise': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    // 'no-unused-vars': 'off',
    'max-classes-per-file': 'off',
    'func-names': 'off',
    'no-continue': 'off',
    'no-unused-expressions': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
