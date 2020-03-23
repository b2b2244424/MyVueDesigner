const fs = require('fs');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const resolve = dir => path.join(__dirname, '', dir);

const isDevMode = process.env.NODE_ENV === 'development';

const publicPath = isDevMode ? '/' : './';
const pagesDir = './src/pages';
const entrys = fs.readdirSync(pagesDir);
console.log('页面入口：', entrys);

const pages = entrys.reduce((acc, name) => {
  acc[name] = `${pagesDir}/${name}/index.js`;
  return acc;
}, {});

console.log("页面列表：");
console.dir(pages);

// path rewrite: /abc -> /abc.html
const rewrites = entrys.map(name => ({
  from: `/${name}`,
  to: path.posix.join(publicPath, `${name}.html`),
}));

process.env.VUE_APP_PAGES = JSON.stringify(entrys)

console.dir(process.env.VUE_APP_PAGES);

// https://github.com/vuejs/vue-cli/tree/dev/docs/config
module.exports = {
  publicPath,
  outputDir: 'dist',
  pages,
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: {
      disableDotRule: true,
      rewrites,
    },
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: config => {
    config.devtool = 'source-map'
    config.resolve.modules.unshift(resolve('src'))
    config.plugins.push(new LodashModuleReplacementPlugin())
  },
  productionSourceMap: false,
};
