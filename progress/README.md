
# hysight-progress

## npm 发布方法
```
    npm set registry http://192.168.1.207:5000
    npm adduser --registry http://192.168.1.207:5000
    npm publish 
```

## Examples

```
import Progress from '@hysight/progress';

or

<Progress ...props />
```

## Usage
```
    npm install @hysight/progress --save --registry=http://192.168.1.207:5000
    or
    yarn add @hysight/progress --registry=http://192.168.1.207:5000
    then
    import Progress from '@hysight/progress'
```

## Tree Props

Prop|Default|Type|Description
:----|:-----|:-----|:-----
percent|0|number|百分比
format|percent => percent + '%'|func(percent)|内容的模板函数
status|normal|string|状态，可选：`normal` `active` `exception` `success`
showInfo|true|boolean|是否显示进度数值或状态图标
strokeWidth|15|number|进度条线的宽度，单位 px


# change logs

### 0.0.1
  + 初始化项目
