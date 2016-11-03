# 1、Newkit框架提供的核心服务

## 1.1、negAjax

用于支持在 ``newkit2`` 中实现Ajax访问，当前所有方法的返回值都是 ``Promise`` 对象，之后有可能会考虑修改为 ``Observable`` 对象，以提供响应支持。

具体用法：

```javascript
// 发送get请求
negAjax.get(url:string, options?:any): Primise<any>

// 发送post请求
negAjax.post(url:string, data, options?:any): Primise<any>

// 发送put请求
negAjax.put(url:string, data, options?:any): Primise<any>

// 发送delete请求
negAjax.delete(url:string, options?:any): Primise<any>
```

## 1.2、negAlert

用于在 ``newkit2`` 中实现信息提示。

## 1.3、negAuth

用于提供授权数据方面的支持

## 1.4、negBreadcrumb

面包屑控制，可以使用如下方法：

```javascript
// 设置所有的面包屑
negBreadcrumb.setBreadcrumbs(breadcrumbs: string[]): void

// 设置最后一个面包屑节点
negBreadcrumb.setLastBreadcrumb(breadcrumb: string): void
```

## 1.5、negConfigService

提供对 ``Config Service`` 的访问支持。

## 1.6、negContext

提供对当前系统上下文的访问。

## 1.7、negDfisUpload

提供Dfis文件上传支持。

## 1.8、negEventBus

提供全局事件总线控制。

```javascript
// 监听事件
negEventBus.on('testevent1', data => {
  // do something...
});

// 触发事件
negEventBus.emit('testevent1', 'some data');
```

## 1.9、negGlobalConfig

提供对 ``Global Config`` 的访问支持

## 1.10、negGlobalLoading

全局加载器

## 1.11、negModuleLoader

模块加载器

## 1.12、negProgress

顶层页面加载器控制

## 1.13、negStorage

提供对 ``LocalStorage``, ``SessionStorage``, ``Cookie``, ``Memory`` 的快捷操作

## 1.14、negTracker

提供性能监视器服务

## 1.15、negUserProfile

提供用户配置信息存储

## 1.16、negUtil

提供通用工具方法支持