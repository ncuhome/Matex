import Bundler from 'parcel-bundler';
import Path from 'path';
import Signale from 'signale';

Signale.start('开始parcel打包');
const rootDir = process.cwd();
// 单个入口文件路径
const entryFiles = Path.resolve(rootDir, './electron/main.ts');
// Bundler 选项
const options = {
  outDir: './dev', // 将生成的文件放入输出目录下，默认为 dist
  outFile: 'main.js', // 输出文件的名称
  publicUrl: '/', // 静态资源的 url ，默认为 '/'
  watch: true, // 是否需要监听文件并在发生改变时重新编译它们，默认为 process.env.NODE_ENV !== 'production'
  cache: true, // 启用或禁用缓存，默认为 true
  cacheDir: '.cache', // 存放缓存的目录，默认为 .cache
  contentHash: false, // 禁止文件名hash
  minify: false, // 压缩文件，当 process.env.NODE_ENV === 'production' 时，会启用
  scopeHoist: false, // 打开实验性的scope hoisting/tree shaking用来缩小生产环境的包。
  target: 'electron', // browser/node/electron, 默认为 browser
  bundleNodeModules: false, // 当package.json的'target'设置'node' or 'electron'时，相应的依赖不会加入bundle中。设置true将被包含。
  logLevel: 3,
  /**
   * 5 = 储存每个信息
   * 4 = 输出信息、警告和错误附加时间戳和dev服务的http请求
   * 3 = 输出信息、警告和错误
   * 2 = 输出警告和错误
   * 1 = 输出错误
   */
  hmr: false, // 开启或禁止HRM
  // hmrPort: 0, // hmr socket 运行的端口，默认为随机空闲端口(在 Node.js 中，0 会被解析为随机空闲端口)
  sourceMaps: true, // 启用或禁用 sourcemaps，默认为启用(在精简版本中不支持)
  // hmrHostname: '', // 热模块重载的主机名，默认为 ''
  detailedReport: false // 打印 bundles、资源、文件大小和使用时间的详细报告，默认为 false，只有在禁用监听状态时才打印报告
};

(async function () {
  // @ts-ignore
  const bundler = new Bundler(entryFiles, options);
  bundler.on('buildStart', () => {
    Signale.start('开始编译');
  });
  bundler.on('buildEnd', () => {
    Signale.success('编译完成');
    (<any>process).send('ok');
  });
  await bundler.bundle();
})();
