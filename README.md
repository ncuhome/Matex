# Matex   基于electron的工具软件

#### 🚀🚀 全新出发,更换项目技术架构,主进程和渲染进程均采用vite打包,统一启动脚本,重新设计ui布局,弃用ui框架,优化项目结构,精简代码，同时升级依赖，引入懒加载，优化启动速度

### 接口测试页面
![screenshot](https://raw.githubusercontent.com/ncuhome/Matex/pro/screenshots/apiTest.png)

## 预期功能

- [x] 数据请求与格式化显示
- [x] 响应图片预览与响应html文档渲染
- [ ] 提供websocket调试
- [ ] 自动化测试
- [ ] 本地mock
- [ ] 更多功能...

## 开发步骤

### 1.安装依赖
 
##### 设置electron国内源
```shell
yarn config set electron_mirror "https://npmmirror.com/mirrors/electron/"
```
##### 安装依赖
```shell
yarn install
```
```shell
npm install
```
### 2.启动项目

```shell
npm run dev
```
```shell
yarn dev
```

## FAQ
### 依赖安装
 如果出现依赖安装问题,请使用淘宝源安装依赖

#### 1.npm
设置淘宝源
```shell
npm config set registry https://registry.npmmirror.com
```
换回默认源
```shell
npm config set registry https://registry.npmjs.org/
```

#### 1.yarn
设置淘宝源
```shell
yarn config set registry https://registry.npmmirror.com
```
换回默认源
```shell
yarn config set registry https://registry.yarnpkg.com
```

