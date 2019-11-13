module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/street',
  assetsDir: 'assets',
  devServer: {
    proxy: {
      '/': {
        target: 'https://cx.xianghunet.com/admin.html?s=team/', // 要访问的接口域名
        changeOrigin: true
      }
    },
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true
  }
}
