module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 0,
    'no-trailing-spaces': 'warn',
    'comma-dangle': ['warn', 'never'],
    'no-unused-vars': ['warn']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
