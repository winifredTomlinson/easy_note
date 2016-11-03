# 1、Newkit框架提供的核心管道

## 1.1、objectToArray

用于将对象转换为对象数组，多余 ``*ngFor``搭配使用：

```
let obj = {
  key1: 'v1',
  key2: 'v2'
}

<ul>
  <li *ngFor="let item of obj | objectToArray">
    {{ item.key }} - {{ item.value }}
  </li>
</ul>

```