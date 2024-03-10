const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      // Configure proxy for the API requests
      '/api': {
        target: 'http://localhost:4000', // Change this to match your backend API URL
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
})
