module.exports = {
  'root': true,
  'plugins': [
      'html'
  ],
  'settings': {
      'html/html-extensions': ['.wxml']
  },
  'rules': {
      'newline-per-chained-call': 'off',
      'eqeqeq': 'off',
      'indent': ['error', 4, { SwitchCase: 1 }],
      'prefer-rest-params': 'off',
      'prefer-template': 'off',
      'array-callback-return': 'off',  // 暂时关闭
      'prefer-const': 'warn',
     

      'no-restricted-properties': [2, {
          'object': 'wx',
          'property': 'navigateTo',
          'message': 'Please use this.$goto!!!'
      }]
  }
}