const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: ['@boyuai/vue-clamp', 'resize-detector'],
  lintOnSave: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 全局变量路径
        path.resolve(__dirname, "./src/assets/css/global.less"),
      ],
    },
  },
  //代理跨域
  devServer: {
    proxy: {
      '/': {
        target: 'http://127.0.0.1:8088',
        ws: false,
      },
    },
  },

})
