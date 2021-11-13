const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const {appDistPath, appSrcPath} = require("./configPath");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinifyPlugin = require('css-minimizer-webpack-plugin')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

//生产环境配置
module.exports = merge(common,{
	mode:'production',
	output:{
		filename:'[name].[contenthash].build.js',
		path:appDistPath,
		clean:true,
		pathinfo: false
	},
	// externals:{
	// 	"react":'React',
	// 	"react-dom":"ReactDOM"
	// },
	plugins: [
		new MiniCssExtractPlugin({
			filename:"[name].css"
		}),
			new OptimizeCssPlugin()
	],
	optimization: {
		runtimeChunk:true,
		minimizer: [
			new CssMinifyPlugin({
				parallel:4
			}),
			new TerserPlugin({
				parallel: 4,
				terserOptions: {
					parse: {
						ecma: 8,
					},
					compress: {
						ecma: 5,
						warnings: false,
						comparisons: false,
						inline: 2,
					},
					mangle: {
						safari10: true,
					},
					output: {
						ecma: 5,
						comments: false,
						ascii_only: true,
					},
				},
			}),
		],
		splitChunks: {
			// include all types of chunks
			chunks: 'all',
			// 重复打包问题
			cacheGroups:{
				vendors:{ // node_modules里的代码
					test: /[\\/]node_modules[\\/]/,
					chunks: "all",
					// name: 'vendors', 一定不要定义固定的name
					priority: 10, // 优先级
					enforce: true
				}
			}
		},
	}
})
