const { appSrcPath, htmlPath } = require('./configPath');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ESBuildPlugin } = require('esbuild-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  cache: {
    type: 'filesystem'
  },
  entry: {
    index: path.resolve(appSrcPath, 'main.tsx')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      template: htmlPath,
      cache: true
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
    new ESBuildPlugin(),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': appSrcPath
    }
  },
  module: {
    rules: [
      {
        test: /.(png|jpg|svg|jpeg|gif)$/,
        include: appSrcPath,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        include: appSrcPath,
        type: 'asset/resource'
      },
      {
        test: /\.css$/i,
        include: appSrcPath,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          }
        ]
      },
      {
        test: /(\.module\.scss)$/,
        include: appSrcPath,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
              importLoaders: 3
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require.resolve('sass')
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          }
        ]
      },
      {
        test: /\.(tsx|ts|jsx|js)$/,
        include: appSrcPath,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: 'es2015'
            }
          }
        ]
      }
    ]
  }
};
