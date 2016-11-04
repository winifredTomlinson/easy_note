# Newkit

Newkit是基于Angular2搭建的前端模块化开发框架。

# 如何使用？

## 安装

```bash
# 全局安装最新版本的newkit-cli
npm i -g newkit-cli

# 在空目录中执行cli命令（init默认会安装一次依赖，安装依赖相对较慢，可以自行选择yarn安装）
nk init

# 安装依赖（可选）
npm i

# 创建模块（app-test为模块名称）
nk create app-test
```

## 配置模块/菜单

当我们创建好模块后，我们需要通过配置，让框架知道如何加载该模块。

打开 ``src/config/config.js``，找到其中的 ``modules`` ，该属性就是用于配置模块。

```javascript
modules: [
  { path: 'nk-template', module: 'nk-template' },
  { path: 'nk-demo', module: 'nk-demo' }
]
```

其中 ``path`` 表示我们url的第一部分，``module`` 表示我们的模块名称。

如 ``{ path: 'nk-template', module: 'nk-template' }`` 则意味这，当我们访问已 ``nk-template`` (path) 开头的url的时候，去加载 ``nk-template`` (module)。

当前版本，没有提供一个在线配置菜单的页面，所以我们需要手动在配置文件中配置菜单。

打开 ``src/config/config.js``，可以看到 ``menus`` 节点，参照配置即可。

**注意：构建没有监控配置文件，所以修改配置之后，需要手动刷新。**

## 运行

```bash
# 运行
npm start
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