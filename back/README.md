
# hysight-back

## npm 发布方法
```
    npm set registry http://192.168.1.207:5000
    npm adduser --registry http://192.168.1.207:5000
    npm publish 
```

## Examples

```
import Back from '@hysight/back';

and

<Back />

```


## Usage
```
    npm install @hysight/back --save --registry=http://192.168.1.207:5000
    or
    yarn add @hysight/back --registry=http://192.168.1.207:5000
    then
    import Back from '@hysight/back'
```

## Props

Prop|Default|Type|Description
:----|:-----|:-----|:-----
size|'small'|string|`small` `middle` `large` 三种可选任一
title|无|node/element|标题，默认不显示标题
href|'/home'|string|点击返回按钮跳转得链接地址,走a标签href
path|''|string|点击返回按钮跳转得链接地址,走react-router-dom Link, 注：href或path设置任一即可


# change logs

### 0.0.3
  + 修复bug
  
### 0.0.2
  + 增加path history路由

### 0.0.1
  + 初始化项目
