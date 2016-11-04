# Newkit

Newkit是基于Angular2搭建的前端模块化开发框架。

# 如何使用？

```bash
# 全局安装最新版本的newkit-cli
npm i -g newkit-cli

# 在空目录中执行cli命令（init默认会安装一次依赖，安装依赖相对较慢，可以自行选择yarn安装）
nk init

# 安装依赖（可选）
npm i

# 运行
npm start

# 创建模块
nk create app-test
```

# 如何开发？

```bash
# clone project
$ git clone http://trgit2/backend_framework/newkit.git

# install dependencies
$ npm i

# build vendor
$ npm run dev:vendor

# start project
$ npm run dev
```