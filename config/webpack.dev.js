const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const { appBuildpath } = require('./configPath');

//开发环境配置
module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: '[name].bundle.js',
    path: appBuildpath,
    clean: true
  },
  devServer: {
    hot: true,
    compress: true,
    port: 3000,
    open: false,
    client: {
      logging: 'info',
      progress: true
    }
  }
});
