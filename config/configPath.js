const fs = require('fs')
const path = require('path')

const appDir = fs.realpathSync(process.cwd())
const resolvePath = (_path)=>path.resolve(appDir,_path)

module.exports={
	resolvePath,
	publicPath: resolvePath('public'),
	htmlPath:resolvePath('public/index.html'),
	appSrcPath:resolvePath('src'),
	appDistPath:resolvePath('dist'),
	appConfigPath:resolvePath('config')
}
