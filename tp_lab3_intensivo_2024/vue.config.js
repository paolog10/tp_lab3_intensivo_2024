const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.yumserver.com/15862/generic',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Esto elimina el prefijo /api
      },
    },
  },
});


