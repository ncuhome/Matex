# Matex
electron项目
![screenshot](https://github.com/ncuhome/Matex/tree/master/test/screenshot/screenshot.png?raw=true)

## 预期功能

- [ ] 数据请求与格式化显示
- [ ] 响应图片预览与响应html文档渲染
- [ ] 提供websocket调试
- [ ] 本地mock(动态启动本地express服务器,可自由配置api接口,取代手写mockjs)
- [ ] 项目Api接口管理(类似swagger,采用联网在team中共享)
- [ ] 更多功能...

## 开发步骤

### 1.安装依赖

```shell
yarn install
```

### 2.启动项目

```shell
npm run start
```

## FAQ
### 依赖安装
 由于国内网络限制,请使用淘宝源安装依赖

#### 1.npm
设置淘宝源
```shell
npm config set registry http://registry.npm.taobao.org/
```
换回默认源
```shell
npm config set registry https://registry.npmjs.org/
```

#### 1.yarn
设置淘宝源
```shell
yarn config set registry https://registry.npm.taobao.org
```
换回默认源
```shell
yarn config set registry https://registry.yarnpkg.com
```

