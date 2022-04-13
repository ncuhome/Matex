# Matex   基于electron的万能工具软件
#
![screenshot](https://raw.githubusercontent.com/ncuhome/Matex/refactor/mac-style/test/screenshot/dev.png)
### 接口测试页面
![screenshot](https://raw.githubusercontent.com/ncuhome/Matex/refactor/mac-style/test/screenshot/screenshot.png)
### 长连接测试页面
![screenshot](https://raw.githubusercontent.com/ncuhome/Matex/refactor/mac-style/test/screenshot/websocket.png)

## 预期功能

- [x] 数据请求与格式化显示
- [x] 响应图片预览与响应html文档渲染
- [x] 提供websocket调试
- [ ] 自动化测试
- [ ] 本地mock
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

