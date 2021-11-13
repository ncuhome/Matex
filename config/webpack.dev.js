const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const {appDistPath} = require('./configPath')
const { HotModuleReplacementPlugin } = require('webpack')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

//开发环境配置
module.exports = merge(common,{
	mode:'development',
	devtool: 'eval-cheap-module-source-map',
	output:{
		filename:'[name].bundle.js',
		path:appDistPath,
		clean:true
	},
	devServer:{
		hot:true,
		compress:true
	},
	plugins:[
			new HotModuleReplacementPlugin(),
			new ReactRefreshPlugin(),
	]
})
