const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    proxy: {
      '/': {
        target: 'http://ali2.botbw.xyz:3000',// 要跨域的域名
        changeOrigin: true, // 是否开启跨域
      }
    }
  }
})
